import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";
import { gray } from "@radix-ui/colors";

const pattern = fs.readFile("./public/images/light-wool.png");

export const prerender = true;

export async function generateOgImage(props: { title: string, description: string, date?: Date, image?: string }) {
  const regularRontData = await fs.readFile("./public/fonts/Inconsolata/static/Inconsolata-Regular.ttf");
  const semiboldFontData = await fs.readFile("./public/fonts/Inconsolata/static/Inconsolata-SemiBold.ttf");
  const base64Pattern = (await pattern).toString("base64");
  const logo = await fs.readFile('public/images/logo.png').then(f => f.toString('base64'))
  const { title, description, date, image } = props;
  const dateString = date
    ? new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date))
    : null;

  const secondaryImage = image
    ? await fs.readFile(`./public/images/${image}`).then(f => f.toString('base64'))
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
                          src: `data:image/png;base64,${logo}`,
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
                          src: `data:image/png;base64,${secondaryImage}`,
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
          backgroundImage: `url('data:image/png;base64,${base64Pattern}')`,
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
