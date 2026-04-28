from processor import NLPProcessor

def test():
    processor = NLPProcessor()
    text = "Rahul will prepare the report by Monday. We should improve the UI performance. Aman is responsible for testing the new features by Friday."
    
    print("--- Processing ---")
    results = processor.process(text)
    
    print("\nSummary:")
    print(results['summary'])
    
    print("\nKey Points:")
    for p in results['key_points']:
        print(f"- {p}")
        
    print("\nAction Items:")
    for a in results['action_items']:
        print(f"{a['person']} -> {a['task']} -> {a['deadline']}")

if __name__ == "__main__":
    test()
