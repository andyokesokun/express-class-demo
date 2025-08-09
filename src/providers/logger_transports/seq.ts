import path from "path";
import Transport from "winston-transport";
import axios from "axios";

class SeqHttpTransport extends Transport {
  private serverUrl: string;
  private apiKey?: string;

  constructor(opts: { serverUrl: string; apiKey?: string }) {
    super(opts as any);
    console.log("SeqHttpTransport initialized with serverUrl:", opts.serverUrl);
    this.serverUrl = opts.serverUrl;
    this.apiKey = opts.apiKey;
  }

  async log(info: any, callback: () => void) {
    setImmediate(() => this.emit("logged", info));

    const payload = {
          Events: [
            {
              Timestamp: new Date().toISOString(),
              Level: info.level.toUpperCase(),
              MessageTemplate: info.message,
              Properties: info,
            },
          ],
        };

    const config = {
       headers: {
            "Content-Type": "application/json",
            ...(this.apiKey ? { "X-Seq-ApiKey": this.apiKey } : {}),
          },
    }

    try {
      await axios.post(`${this.serverUrl}/api/events/raw`, payload, config);
    } catch (err) {
      console.error("Failed to send logs to Seq:", err);
    }

    callback();
  }
}

export default SeqHttpTransport;
