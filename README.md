# VOYARA

A travel booking prototype for finding distinctive stays, comparing sample routes, exploring trip ideas, switching display currencies, and saving demo bookings to My Trips.

## Run the hackathon demo

```bash
npm install
npm run dev
```

Open http://localhost:3000. The curated hotel listings and demo booking flow work without setting up Supabase. Demo bookings are saved in this browser only. The payment screen is a prototype and does not collect or process payment details. Currency conversion is indicative, based on static sample rates.

## Turn on the Supabase hotel booking backend

1. Create a Supabase project.
2. Run `supabase/migrations/001_init.sql`, then `supabase/seed.sql` in the Supabase SQL editor.
3. Put your project URL and anon key in `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-REAL-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-real-anon-key
   ```

4. Restart `npm run dev`. Sign-in and sign-up use Supabase Auth; authenticated hotel bookings are priced and availability-checked by the `create_hotel_booking` database function. My Trips reads the signed-in user's bookings.
5. To enable admin pages, set the signed-in user's role in the `profiles` table to `admin`.

The checkout screen is still a demo. Connect a payment provider and confirm payments using its server-side webhook before accepting real payments. Transport schedules, route prices and package ideas are sample content; connect supplier APIs to show live inventory and ticket prices.
