import { api } from "../../../shared/api";
import { FilesType, IFile } from "../types";

const REPO_LODASH_CONTENTS_URL =  '/repos/lodash/lodash/contents';

interface GetLoadashFileContentProps {
    filesType: FilesType;
    checkedFileNames: string[];
  }
  

export const getLoadashFileContent = async ({ filesType, checkedFileNames }: GetLoadashFileContentProps) => {
    try {
        const response = await api.get(REPO_LODASH_CONTENTS_URL);

        const fileNamesCurrent: string[] = [];
        const fileNamesAll: string[] = [];
        const fileContentPromises = response.data.map(async (file: IFile) => {
            console.log(file);
            
            fileNamesAll.push(file.name);

            const isJS = filesType === 'JS' && file.name.endsWith('.js');
            const isTS = filesType === 'TS' && file.name.endsWith('.ts');
            const isJS_TS = filesType === 'JS/TS' && (file.name.endsWith('.js') || file.name.endsWith('.ts'));
            const isCUSTOM = filesType === 'CUSTOM' && checkedFileNames.includes(file.name);
        
            if (isJS || isTS || isJS_TS || isCUSTOM) {
                fileNamesCurrent.push(file.name);
                const fileResponse = await api.get(file.download_url);
                return fileResponse.data;
            }
        
            return '';
        });

        const fileContents = await Promise.all(fileContentPromises);
        const combinedFileContent = fileContents.join('');

        return { combinedFileContent, fileNamesCurrent, fileNamesAll };
    } catch (error) {
        console.error('Error', error);
    }
};