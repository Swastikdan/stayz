import { NextResponse } from "next/server"
import Indian_states_cities_list from 'indian-states-cities-list';
export async function GET(){
    return NextResponse.json({
      status: 200,
      body: {
        message: Indian_states_cities_list.STATE_WISE_CITIES.WestBengal,
      },
    });
}

// Indian_states_cities_list.STATES_OBJECT;