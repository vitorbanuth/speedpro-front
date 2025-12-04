import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // const connection = await mysql.createConnection({
    //   host: 'localhost',
    //   user: 'root',
    //   password: 'sua_senha',
    //   database: 'nome_banco',
    // });
    const dados = await req.json()
    // const [rows] = await connection.query('SELECT * FROM usuarios');
    return NextResponse.json({echo: dados });
  }