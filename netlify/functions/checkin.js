exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        success: false,
        message: "Metode tidak diizinkan."
      })
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");
    const gasUrl = process.env.GAS_WEB_APP_URL;

    if (!gasUrl) {
      throw new Error("GAS_WEB_APP_URL belum diatur di Netlify.");
    }

    const response = await fetch(gasUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pin: data.pin,
        token: data.token
      })
    });

    const result = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(result)
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        success: false,
        message: error.message || "Terjadi kesalahan."
      })
    };
  }
};
