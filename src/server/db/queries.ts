import "server-only"
import { db } from "~/server/db"
import {
  files_table as filesSchema,
  folders_table as foldersSchema
} from "~/server/db/schema";

import { eq } from "drizzle-orm";

export const QUERIES = {
  getFiles: function (fileId: number) {
    return db.select().from(filesSchema).where(eq(filesSchema.parent, fileId))
  },
  getFolders: function (folderId: number) {
    return db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, folderId));
  },
  getAllParentsForFolder: async function (folderId: number) {
    const parents = []
    let currentId: number | null = folderId;

    while (currentId !== null) {
      const folder = await db
        .select()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentId));

      if (!folder[0]) {
        throw new Error("Folder not found");
      }
      parents.unshift(folder[0])
      currentId = folder[0]?.parent;
    }
    return parents
  },
}

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string
      size: number
      url: string
      parent: number
    }
    userId: string
  }) {
    return db.insert(filesSchema).values({ ...input.file, parent: input.file.parent })
  },
}
