import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";
import { gray } from "@radix-ui/colors";

export const prerender = true;

export async function generateOgImage(props: { title: string, description: string, date?: Date, image?: string }) {
  const { title, description, date, image } = props;
  const regularRontData = await loadFont("Inconsolata-Regular.ttf");
  const semiboldFontData = await loadFont("Inconsolata-SemiBold.ttf");
  const base64Pattern = await loadImage('./public/images/light-wool.png');
  const logo = await loadImage('public/images/logo.png');
  const dateString = date ? formatDate(date) : null;
  const secondaryImage = image
    ? await loadImage(`./public/images/${image}`)
    : null;

  const svg = await satori(
    {
      type: "div",
      props: {
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderWidth: 4,
                borderRadius: 8,
                borderColor: gray.gray8,
                boxShadow: `8px 8px 0 0 ${gray.gray12}`,
                width: '100%',
                height: '100%',
                padding: 40,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: 'flex',
                      justifyContent: "space-between",
                      alignItems: 'flex-start'
                    },
                    children: [
                      {
                        type: 'img',
                        props: {
                          src: logo,
                          width: 40,
                          height: 40,
                        }
                      },
                    ]
                  }
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8
                    },
                    children: [
                      (secondaryImage ? {
                        type: 'img',
                        props: {
                          src: secondaryImage,
                          width: 80,
                          height: 80,
                        }
                      } : null),
                      {
                        type: "h1",
                        props: {
                          children: title,
                          style: {
                            fontSize: "3.75rem",
                            fontWeight: 600,
                            lineHeight: 1,
                            color: gray.gray12,
                            fontFamily: "InconsolataSemibold",
                          },
                        },
                      },
                      {
                        type: "span",
                        props: {
                          children: description,
                          style: {
                            color: gray.gray11,
                            fontSize: "2.25rem",
                            lineHeight: 1.5,
                            fontFamily: "InconsolataSemibold",
                          },
                        },
                      },
                      (dateString ? {
                        type: "p",
                        props: {
                          children: `by Nick Ball on ${dateString}`,
                          style: {
                            fontSize: "1.5rem",
                            fontFamily: "Inconsolata",
                            color: gray.gray11,
                          }
                        }
                      } : null)
                    ]
                  }
                }
              ]
            }
          },
        ],
        style: {
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: 'center',
          backgroundImage: `url('${base64Pattern}')`,
          backgroundColor: 'white',
          backgroundRepeat: "repeat",
          padding: 48,
        },
      },
    },
    {
      debug: false,
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inconsolata",
          data: regularRontData,
          weight: 400,
          style: "normal",
        },
        {
          name: "InconsolataSemibold",
          data: semiboldFontData,
          weight: 600,
          style: "normal",
        },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return png;
}

async function loadImage(path: string) {
  const file = await fs.readFile(path)
  const base64 = file.toString('base64');
  return `data:image/png;base64,${base64}`;
}

function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

async function loadFont(fontPath: string) {
  return fs.readFile(`./public/fonts/Inconsolata/static/${fontPath}`);
}
