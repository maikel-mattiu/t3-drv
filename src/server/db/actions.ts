"use server"

import { and, eq } from "drizzle-orm"
import { db } from "."
import { files_table } from "./schema"
import { auth } from "@clerk/nextjs/server"
import { UTApi } from "uploadthing/server"
import { cookies } from "next/headers"

const utApi = new UTApi()

export async function deleteFile(fileId: number) {
  const session = await auth()

  if (!session.userId) {
    return { error: "Unauthorized" }
  }

  const [file] = await db
    .select()
    .from(files_table)
    .where(
      and(eq(files_table.id, fileId), eq(files_table.ownerId, session.userId)),
    )

  if (!file) {
    return {error: "File not found"}
  }

  const utapiResult = await utApi.deleteFiles([file.url.replace("https://1aifyp2nf9.ufs.sh/f/", "")])

  console.log(utapiResult)

  const dbDeleteResult = await db.delete(files_table).where(eq(files_table.id, fileId))

  console.log(dbDeleteResult)

  const dbCookies = await cookies()

  dbCookies.set("force-refresh", JSON.stringify(Math.random()))

  return { success: true }
}

