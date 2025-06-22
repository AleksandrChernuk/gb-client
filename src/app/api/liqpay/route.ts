/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as Liqpay from 'liqpay-sdk-nodejs';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { IOrderBody } from '@/actions/liqpay.checkout.actions';

const liqpay = new Liqpay(process.env.LIQPAY_PUBLIC_KEY, process.env.LIQPAY_PRIVATE_KEY);

export async function POST(req: Request) {
  try {
    const order = (await req.json()) as IOrderBody;

    const params = liqpay.cnb_params({
      action: 'pay',
      amount: `1`,
      currency: 'UAH',
      description: 'Оплата за квитки',
      order_id: randomUUID(),
      version: '3',
      result_url: `${order.result_url}?=id:90343`,
    });

    const liqpaydata = Buffer.from(JSON.stringify(params)).toString('base64');
    const signature = liqpay.str_to_sign(process.env.LIQPAY_PRIVATE_KEY + liqpaydata + process.env.LIQPAY_PRIVATE_KEY);
    return NextResponse.json({ data: liqpaydata, signature });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
