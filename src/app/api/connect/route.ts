import pool from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const result = await pool.query("SELECT * FROM employees");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    console.log(process.env.DB_PASSWORD);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
