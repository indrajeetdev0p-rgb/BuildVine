import { s3Client, S3_BUCKET, S3_PUBLIC_URL } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getSession } from "@/lib/session";
import { randomUUID } from "node:crypto";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { fileName, contentType } = await request.json();

  if (!fileName || !contentType) {
    return Response.json({ error: "Missing fileName or contentType" }, { status: 400 });
  }

  const ext = fileName.split(".").pop();
  const key = `${session.user.id}/${randomUUID()}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    return Response.json({
      signedUrl,
      key,
      publicUrl: `${S3_PUBLIC_URL}/${key}`,
    });
  } catch (error) {
    console.error("Upload error", error);
    return Response.json({ error: "Failed to generate upload URL" }, { status: 500 });
  }
}
