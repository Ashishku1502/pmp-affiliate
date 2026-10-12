import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { PLAN } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummykey',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummysecret',
    });

    const options = {
      amount: PLAN.fee * 100, // Amount is in currency subunits (Paisa)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({ 
      id: order.id, 
      amount: order.amount, 
      currency: order.currency 
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Razorpay order failed' }, { status: 500 });
  }
}
