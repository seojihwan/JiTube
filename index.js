import app from "./app";
import "./db";
const port = 3000;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
