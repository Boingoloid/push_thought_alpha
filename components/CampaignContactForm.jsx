import OfficialCalc from "./OfficialCalc";
import ShareButtons from "./ShareButtons";
import { FaPaperPlane } from "react-icons/fa"
import { useState } from "react";
import EmbeddedTweet from '@/components/EmbeddedTweet';
import EmbeddedFacebookPost from '@/components/EmbeddedFacebookPost';
import { useEffect } from "react";




const CampaignContactForm = ({ campaign, setSocialData }) => {

  const [selectedOption, setSelectedOption] = useState(""); // Default to an empty value
  const [officials, setOfficials] = useState([])

  useEffect(() => {

    console.log("campaign", campaign)

  }, [])


  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value)
    getData(event.target.value)
  };

  function getData(data) {
    console.log("MYDATA::", data)
    setOfficials(data)

    // get the officials data
  }
  // https://www.facebook.com/bhammer705/posts/10231903458228007:555873576855554
  const facebookPostUrl = 'https://www.facebook.com/matthew.acalin/posts/pfbid02EgXSng8Gzbh8nWxHdYqbuvyZJe5G4y9L3aXLSooznnQYVAz6nMzs6dg3fWtwDsiWl'; // Example post URL
  // https://www.facebook.com/chris.burke.965/posts/pfbid0qUWebGJCWy1oHWWJwPkZ81PeCcbiUMJQ2xNjE2P4gqCFh3WtLp7qhxWvTvpn3BuRl
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-3">1. Repost Activist Messages</h3>


      <EmbeddedTweet tweetId={campaign && campaign.x_repost_id} />
      <EmbeddedFacebookPost postUrl={facebookPostUrl} />


      <h3 className="text-xl font-bold mb-3">2. Contact the Decision Maker</h3>
      <div className="mb-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex flex-col">
            {campaign.target_name}
            <div className="mr-5">{campaign.target_title}</div>
          </div>
          <ShareButtons socialData={null} campaign={campaign} />
        </div>
        {/* {campaign.target_facebook.address}
            {campaign.target_x.address}
            {campaign.target_instagram.address} */}
      </div>
      <form >
        <h3 className="text-xl font-bold mb-3">3. Contact Congress</h3>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='state'
          >
            Select State:
          </label>
          <select defaultValue="" onChange={handleChange} value={selectedOption}>
            <option value="" disabled>-- Select --</option>
            <option value="Alabama">Alabama</option>
            <option value="Alaska">Alaska</option>
            <option value="Arizona">Arizona</option>
            <option value="Arkansas">Arkansas</option>
            <option value="California">California</option>
            <option value="Colorado">Colorado</option>
            <option value="Connecticut">Connecticut</option>
            <option value="Delaware">Delaware</option>
            <option value="Florida">Florida</option>
            <option value="Nebraska">Nebraska</option>
            <option value="Nevada">Nevada</option>
            <option value="New Hampshire">New Hampshire</option>
            <option value="New Jersey">New Jersey</option>
            <option value="New Mexico">New Mexico</option>
            <option value="New York">New York</option>
            <option value="North Carolina">North Carolina</option>
            <option value="North Dakota">North Dakota</option>
            <option value="Ohio">Ohio</option>
            <option value="Oklahoma">Oklahoma</option>
            <option value="Oregon">Oregon</option>
            <option value="Pennsylvania">Pennsylvania</option>
            <option value="Rhode Island">Rhode Island</option>
            <option value="South Carolina">South Carolina</option>
            <option value="South Dakota">South Dakota</option>
            <option value="Tennessee">Tennessee</option>
            <option value="Texas">Texas</option>
            <option value="Utah">Utah</option>
            <option value="Vermont">Vermont</option>
            <option value="Virginia">Virginia</option>
            <option value="Washington">Washington</option>
            <option value="West Virginia">West Virginia</option>
            <option value="Wisconsin">Wisconsin</option>
            <option value="Wyoming">Wyoming</option>
          </select>

          {/* <input
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        id='name'
        type='text'
        placeholder='Enter your name'             
        required
      /> */}
        </div>

        <div>
          {/* <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
          type="submit"
        >
          <FaPaperPlane className="mr-2" /> Send Message
        </button> */}
        </div>
      </form>

      <OfficialCalc campaign={campaign} setSocialData={setSocialData} state={selectedOption} />

      {/* {selectedOption & <OfficialCalc state={selectedOption} />} */}

    </div>
  )
}

export default CampaignContactForm
