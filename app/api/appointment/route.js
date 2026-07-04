import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import twilio from 'twilio';

// Supabase Connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Twilio Connection for SMS
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioFromNumber = process.env.TWILIO_FROM_NUMBER;
const doctorMobileNumber = "+918378967688"; // Dr. Prabhat ka number

export async function POST(request) {
  try {
    const { patient_name, phone, treatment, appointment_date } = await request.json();

    // 1. Save to Supabase Database
    const { error } = await supabase.from('appointments').insert([
      { patient_name, phone, treatment, appointment_date, status: 'Pending' }
    ]);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // 2. Send SMS to Doctor using Twilio
    if (accountSid && authToken) {
      const client = twilio(accountSid, authToken);
      const smsMessage = `🚨 NEW APPOINTMENT ALERT 🚨\n\nPatient: ${patient_name}\nPhone: ${phone}\nTreatment: ${treatment}\nDate: ${appointment_date}`;
      
      await client.messages.create({
        body: smsMessage,
        from: twilioFromNumber,
        to: doctorMobileNumber
      });
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
