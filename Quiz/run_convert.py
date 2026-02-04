import convert_quiz

if __name__ == "__main__":
    try:
        convert_quiz.main()
    except Exception as e:
        print(f"Error running conversion: {e}")
        import traceback
        traceback.print_exc()
