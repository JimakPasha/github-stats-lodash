import { CaseType, FilesType } from "./";

export interface IFilters {
    caseType: CaseType;
    filesType: FilesType;
    checkedFileNames: string[];
}
