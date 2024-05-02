import { useEffect, useState } from "react";
import { IFilters } from "../types";
import { calculateLetterFrequency } from "../lib";
import { getLoadashFileContent } from "../api/getLoadashFileContent";

interface UseGetStatisticProps {
    filters: IFilters;
}

export const useGetStatistic = ({ filters }: UseGetStatisticProps) => {
    const [fileNamesCurrent, setFileNamesCurrent] = useState<string[]>([]);
    const [fileNamesAll, setFileNamesAll] = useState<string[]>([]);
    const [letterFrequency, setLetterFrequency] = useState<{
      [letter: string]: number;
    }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
  
    const sortedLetterFrequency = Object.entries(letterFrequency).sort(
      (a, b) => b[1] - a[1]
    );
  

    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          setIsError(false);

          await getLoadashFileContent({ filesType: filters.filesType, checkedFileNames: filters.checkedFileNames }).then((data) => {
            if (data) {
              const newLetterFrequency = calculateLetterFrequency({ fileContent: data.combinedFileContent, caseType: filters.caseType })

              setFileNamesCurrent(data.fileNamesCurrent);
              setFileNamesAll(data.fileNamesAll);

              setLetterFrequency(newLetterFrequency);
            }
          }).catch(() => setIsError(true)).finally(() => setIsLoading(false));
        };
    
        fetchData();
      }, [filters]);


  return { sortedLetterFrequency, fileNamesCurrent, fileNamesAll, isLoading, isError };
}