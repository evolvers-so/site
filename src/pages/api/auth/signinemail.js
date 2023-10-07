import { createTransport } from "nodemailer";

export async function CustomsendVerificationRequest(params) {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);
  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host, theme }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

function html(params ) {
  let { url, host, theme } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  return `
  <!DOCTYPE html>
<html>
<head>
    <title>Welcome to Evolve</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background-color: #212121; 
            color: #FFFFFF; /* White text color */
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }

        .container {
            width: 80%;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        }

        .header {
            padding: 20px 0;
            text-align: center;
            font-size: 32px;
            border-bottom: 3px solid #6200EA; /* Purple accent for header */
        }

        .content {
            padding: 40px 20px;
        }

        h1, h2, h3 {
            margin-top: 24px;
            margin-bottom: 16px;
        }

        p {
            font-size: 16px;
            margin-bottom: 16px;
        }

        .highlight {
            color: #6200EA; /* Purple accent for highlighted text */
            font-weight: bold;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 14px;
            color: #AAA; /* Lighter color for footer */
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            border: none;
            border-radius: 5px;
            background-color: #6200EA; /* Purple accent for button */
            color: #FFFFFF; 
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }

        .btn:hover {
            background-color: #5000b8;
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            Welcome to <span class="highlight">Evolve</span>
        </div>
        <div class="content">
            <h1>A New Era of Teen Entrepreneurs</h1>
            <p>
                We're thrilled to have you join <span class="highlight">Evolve</span>, where the brilliance of youthful vision meets the tenacity of entrepreneurial spirit. This is where dreams become ventures, and ambitions transcend boundaries.
            </p>
            <h2>Dreaming Big, Starting Small</h2>
            <p>
                Your journey may start small, but it's driven by a vision that knows no bounds. In every tiny start, we see a blueprint for a future filled with achievements and innovations.
            </p>
            <h3>The Community Awaits...</h3>
            <p>
                Connect with a dynamic network of teen entrepreneurs. Share, learn, collaborate, and grow together. Your first step into a world where every effort counts and every dream is valid has just begun.
            </p>
            <a href="${url}" class="btn">Get Started</a>
            <p>
                Warm wishes, <br>
                The Evolve Team
            </p>
        </div>
        <div class="footer">
            © 2023 Evolve | Where Dreams Evolve into Ventures
        </div>
    </div>
</body>
</html>

  `;
}

// Email Text body (fallback for email clients that don't render HTML)
function text({ url, host}) {
  return `Sign in to ${host}\n${url}\n\n`;
}
