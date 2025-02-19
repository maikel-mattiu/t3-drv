import "server-only"
import { db } from "~/server/db"
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "~/server/db/schema";

import { and, eq, isNull } from "drizzle-orm";

export const QUERIES = {
  getFiles: function (fileId: number) {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, fileId))
      .orderBy(filesSchema.id);
  },
  getFolders: function (folderId: number) {
    return db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, folderId))
      .orderBy(foldersSchema.id);
  },
  getAllParentsForFolder: async function (folderId: number) {
    const parents = [];
    let currentId: number | null = folderId;

    while (currentId !== null) {
      const folder = await db
        .select()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentId));

      if (!folder[0]) {
        throw new Error("Folder not found");
      }
      parents.unshift(folder[0]);
      currentId = folder[0]?.parent;
    }
    return parents;
  },
  getFolderById: async function (folderId: number) {
    const folder = await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, folderId));
    return folder[0];
  },
  getRootFolderForUser: async function (userId: string) {
    const rootFolder = await db
      .select()
      .from(foldersSchema)
      .where(
        and(eq(foldersSchema.ownerId, userId), isNull(foldersSchema.parent)),
      )
    return rootFolder[0];
  },
};

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string
      size: number
      url: string
      parent: number;
    };
    userId: string;
  }) {
    return db
      .insert(filesSchema)
      .values({ ...input.file, ownerId: input.userId });
  },
  onboardUser: async function (userId: string) {
    const rootFolder = await db
      .insert(foldersSchema)
      .values({ name: "Root", ownerId: userId, parent: null })
      .$returningId()

    const rootFolderId = rootFolder[0]!.id

    await db.insert(foldersSchema).values([
      { name: "Shared", ownerId: userId, parent: rootFolderId },
      { name: "Trash", ownerId: userId, parent: rootFolderId },
      { name: "Documents", ownerId: userId, parent: rootFolderId },
      { name: "Pictures", ownerId: userId, parent: rootFolderId },
    ])

    return rootFolderId
  }
}
