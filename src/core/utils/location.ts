import axios from "axios";
import { CustomError } from "../commons/exceptions";

const getAddressFromLatLng = async (lat: number, lng: number): Promise<string> => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GMAPS_API_KEY}`;
    try {
      const response = await axios.get(url);
      const results = response.data.results;
      if (results.length > 0) {
        return results[0].formatted_address;
      } else {
        throw new CustomError(400,'No results found');
      }
    } catch (error) {
      throw new Error(`Geocoding error: ${error}`);
    }
  };
  
  export { getAddressFromLatLng };