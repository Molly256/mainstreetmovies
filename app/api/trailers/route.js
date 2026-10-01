import fs from 'fs';
import path from 'path';
export async function GET(){
  const filePath = path.join(process.cwd(), 'trailers_data.json');
  const data = JSON.parse(fs.readFileSync(filePath,'utf8'));
  return Response.json(data);
}