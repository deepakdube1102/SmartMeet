import spacy
from spacy.matcher import Matcher
import en_core_web_sm
from transformers import pipeline
import torch
import re

class NLPProcessor:
    def __init__(self):
        # Load spaCy model
        # Load spaCy model (installed via requirements.txt for Vercel)
        self.nlp = en_core_web_sm.load()
        
        # Initialize Matcher for Action Items
        self.matcher = Matcher(self.nlp.vocab)
        self._setup_action_patterns()
        
        # Load Summarization Pipeline (Lazy loading to save memory until needed)
        self.summarizer = None
        
    def _setup_action_patterns(self):
        # Pattern 1: <Name> will <Action> (Allow PROPN for name)
        pattern1 = [{"POS": "PROPN", "OP": "?"}, {"LOWER": "will"}, {"POS": "VERB", "OP": "+"}]
        # Pattern 2: <Name> is responsible for <Action>
        pattern2 = [{"POS": "PROPN", "OP": "?"}, {"LEMMA": "be"}, {"LOWER": "responsible"}, {"LOWER": "for"}]
        # Pattern 3: We should <Action>
        pattern3 = [{"LOWER": "we"}, {"LOWER": "should"}, {"POS": "VERB", "OP": "+"}]
        # Pattern 4: Need to <Action>
        pattern4 = [{"LOWER": "need"}, {"LOWER": "to"}, {"POS": "VERB", "OP": "+"}]
        
        self.matcher.add("ACTION_WILL", [pattern1])
        self.matcher.add("ACTION_RESPONSIBLE", [pattern2])
        self.matcher.add("ACTION_SHOULD", [pattern3])
        self.matcher.add("ACTION_NEED", [pattern4])

    def get_summary(self, text):
        """Generates a concise summary using BART model with extractive fallback."""
        if len(text.split()) < 30:
            return text # Too short to summarize
            
        try:
            if self.summarizer is None:
                # Use a lightweight model for speed and memory efficiency
                self.summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6", device=-1)
            
            # Limit input length for transformer
            max_input = 1024
            truncated_text = text[:max_input]
            
            summary = self.summarizer(truncated_text, max_length=60, min_length=20, do_sample=False)
            return summary[0]['summary_text']
        except Exception as e:
            print(f"Transformer error: {e}. Falling back to extractive summarization.")
            return self._extractive_summary(text)

    def _extractive_summary(self, text, num_sentences=3):
        """Simple frequency-based extractive summarization."""
        doc = self.nlp(text)
        # Word frequency
        freq = {}
        for word in doc:
            if not word.is_stop and not word.is_punct:
                if word.text.lower() not in freq:
                    freq[word.text.lower()] = 1
                else:
                    freq[word.text.lower()] += 1
        
        if not freq: return text[:200] + "..."

        max_freq = max(freq.values())
        for word in freq:
            freq[word] = freq[word]/max_freq
            
        # Sentence scoring
        sent_scores = {}
        for sent in doc.sents:
            for word in sent:
                if word.text.lower() in freq:
                    if sent not in sent_scores:
                        sent_scores[sent] = freq[word.text.lower()]
                    else:
                        sent_scores[sent] += freq[word.text.lower()]
        
        # Get top sentences
        top_sentences = sorted(sent_scores, key=sent_scores.get, reverse=True)[:num_sentences]
        summary = " ".join([sent.text for sent in top_sentences])
        return summary

    def extract_key_points(self, text):
        """Extracts significant discussion points using noun chunks and sentence ranking."""
        doc = self.nlp(text)
        sentences = list(doc.sents)
        
        # Simple heuristic: Take sentences that are not too short and have a subject
        key_points = []
        for sent in sentences:
            if 5 < len(sent.text.split()) < 40:
                # Check if it has a subject
                has_subj = any(tok.dep_ in ["nsubj", "nsubjpass"] for tok in sent)
                if has_subj:
                    key_points.append(sent.text.strip())
                    
        return key_points[:5]

    def extract_action_items(self, text):
        """Identifies tasks, responsibilities, and deadlines."""
        doc = self.nlp(text)
        matches = self.matcher(doc)
        
        action_items = []
        
        # Track already added sentences to avoid duplicates
        seen_sentences = set()

        for match_id, start, end in matches:
            span = doc[start:end]
            sent = span.sent
            
            if sent.text in seen_sentences:
                continue
            
            # Extract Person
            person = "Team"
            for ent in sent.ents:
                if ent.label_ == "PERSON":
                    person = ent.text
                    break
            
            # If no PERSON entity, check for PROPN at start of span
            if person == "Team" and span[0].pos_ == "PROPN":
                person = span[0].text

            # Extract Task
            # Get the verb phrase after the trigger
            task = sent.text
            # Try to refine task: take everything from the verb onwards
            for token in sent:
                if token.pos_ == "VERB" and token.i >= start:
                    task = doc[token.i : sent.end].text
                    break
            
            # Extract Deadline
            deadline = "No deadline"
            for ent in sent.ents:
                if ent.label_ in ["DATE", "TIME"]:
                    deadline = ent.text
                    # Remove deadline from task text if it's there
                    task = task.replace(deadline, "").strip()
                    break
            
            action_items.append({
                "person": person,
                "task": task.strip("., "),
                "deadline": deadline
            })
            seen_sentences.add(sent.text)
            
        return action_items

    def process(self, text):
        """Full processing pipeline."""
        if not text.strip():
            return {
                "summary": "",
                "key_points": [],
                "action_items": []
            }
            
        return {
            "summary": self.get_summary(text),
            "key_points": self.extract_key_points(text),
            "action_items": self.extract_action_items(text)
        }
