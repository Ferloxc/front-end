export interface RenderProject {
  _id: Object;
  Name: string;
  Description: string;
  CssFile: Block;
  JsFile: Block;
  HtmlFile: Block;
  CreatedAt: Date;
  ModifiedAt: Date;
  Owner: object;
}

export interface Block {
  _id: object;
  Name: string;
  IsFolder: boolean;
  FileType: string;
  Size: number;
  FileData: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  // parentFolder: { type: ObjectId; ref: 'block' }; // points to the parent folder
  // ancestorFolders: [{ type: ObjectId; ref: 'block' }]; // points to all the       ancestors including the parent
}
