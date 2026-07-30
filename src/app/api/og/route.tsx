import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title") || "BuildVine Project";
    const author = searchParams.get("author") || "Developer";
    const avatar = searchParams.get("avatar") || "";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundImage: "linear-gradient(to bottom right, #000000, #1a1a1a)",
            padding: "80px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatar}
                alt="Avatar"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  marginRight: "24px",
                  border: "4px solid #333",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  backgroundColor: "#333",
                  marginRight: "24px",
                }}
              />
            )}
            <div
              style={{
                fontSize: "42px",
                fontWeight: 600,
                color: "#a0a0a0",
              }}
            >
              {author}
            </div>
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.2,
              marginBottom: "30px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 500,
              color: "#f59e0b",
            }}
          >
            BuildVine.dev
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
