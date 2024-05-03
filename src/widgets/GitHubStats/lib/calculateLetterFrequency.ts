import { CaseType } from "../types";

interface CalculateLetterFrequencyProps {
    fileContent: string;
    caseType: CaseType;
}

export const calculateLetterFrequency = ({ fileContent, caseType }: CalculateLetterFrequencyProps ) => {
    const letterFrequency: { [letter: string]: number } = {};
    const letters = fileContent.match(
      new RegExp("[a-zA-Z]", caseType === 'ignoreCase' ? "gi" : "g")
    );

    if (letters) {
      for (const letter of letters) {
        letterFrequency[letter] = (letterFrequency[letter] || 0) + 1;
      }
    }

    return letterFrequency;
  };
