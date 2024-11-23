import { useEffect, useState } from 'react'
import Image from 'next/image';

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share'
// import ToastInfo from './ToastInfo';
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { ImCheckmark } from "react-icons/im";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import clsx from 'clsx';
import "../assets/styles/checkmarks.css"
import greenCheck from "../assets/images/green_check.png";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

let count = 0;

const ShareButtons = ({ campaign, socialData }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/campaigns/${campaign._id}`
  const [social, setSocial] = useState([])
  const [isShowingX, setIsShowingX] = useState(true)
  const [isShowingFB, setIsShowingFB] = useState(false)
  const [messageSent, setMessageSent] = useState("")
  const [showToastInfo, setShowToastInfo] = useState(true)

  const MySwal = withReactContent(Swal)
  const SocialSwal = withReactContent(Swal)

  const socialSweetClick = () => {
    SocialSwal.fire({
      title: "Your post was successful.",
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        // Swal.showLoading();
      },
      willClose: () => {
        // clearInterval(timerInterval);
      }
    })
  }

  const mysweetClick = () => {
    if (showToastInfo) {
      MySwal.fire({
        title: `Your message text will be: \n ${twitterAddress} ${campaign.name} ${shareUrl}`,
        cancelButtonText: "No",
        showCancelButton: true,
        confirmButtonText: "Yes"
      })
        .then((result) => {
          ++count;
          console.log("count:", count)
          if (result.isConfirmed) {
            setMessageSent("Yes")
            console.log("In the `isConfirmed` block")
            setShowToastInfo(false)
            // handleSubmitTest()
            Swal.close()
          } else if (result.isDismissed && count > 1) {
            // && count > 1
            setShowToastInfo(true)
            // handleSubmitTest()
            // Swal.close()
            setMessageSent("No")
            console.log("In the dismissed")
            // if (result.isConfirmed) {
            //     console.log("In the dismissed")
            // }

          }

        });
    }
  }

  const CloseButton = ({ closeToast }) => {
    return (
      <i
        style={{ fontSize: "32px", position: "relative", top: "130px", right: "180px", border: "2px solid black", padding: "10px 8px 20px 8px", width: "auto", height: "70px", fontStyle: "normal", color: "white", backgroundColor: "green", borderRadius: "10px" }}
        onClick={closeToast}
      >Submit</i>
    )
  }

  const postingMessage = () => {
    console.log("message value", messageSent)
  }

  const displayXMsg = () => {

    return (
      (<ToastInfo
        // messageSent={messageSent}
        setMessageSent={setMessageSent}
      />)
    )

  }

  useEffect(() => {
    console.log("socialData: ", socialData)
    setSocial(socialData)

  }, [socialData])

  const handleSubmitTest = () => {
    console.log(`It worked and messageSent is ${messageSent}`)
  }

  useEffect(() => {
    handleSubmitTest()
    // console.log(`This is the messageSent: ${messageSent}`)
    // console.log("showToastInfo has changed in the useEffect", showToastInfo)
    // setShowToastInfo(false)
  }, [messageSent])

  // Safely access target_facebook.address and target_x.address
  const facebookAddress = campaign?.target_facebook?.address || '';
  const twitterAddress = campaign?.target_x?.address || '';

  // console.log("CAMPAIGN REPOST ID: " + campaign.x_repost_id)

  const xClosed = () => {
    console.log("CAMPAIGN REPOST ID: " + campaign.x_repost_id);

    fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/tweet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tweetMessage: `${twitterAddress} ${campaign.name} \n ${shareUrl}` }),
    })
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        console.log('result', result)
        socialSweetClick()
      })
      .catch((err) => {
        console.log(err)
      })


    // console.log("just closed X")
    // if (messageSent === "Yes") {
    //   return;
    // }
    // setShowToastInfo(true)
    // mysweetClick()
    // if ( messageSent === "No") {
    //   setShowToastInfo(true)
    // } else if (messageSent === "Yes") {
    //   setShowToastInfo(false)
    // }
  }

  const fcClosed = () => {
    console.log("Facebook")
  }

  return (
    <>
      {/* {showToastInfo && <ToastInfo
        setMessageSent={setMessageSent}
      // setShowToastInfo={setShowToastInfo}
      // handleSubmitTest={handleSubmitTest}
      />} */}
      {/* {showToastInfo && mysweet} */}
      <h3 className='text-xl font-bold text-center pt-2'>
      </h3>
      {/* <ToastContainer
        style={{ marginTop: "300px", fontSize: "52px", width: "600px" }}
        closeButton={CloseButton}
      /> */}
      <div className="flex gap-3 justify-center pb-1 pt-1">
        {/* <FacebookShareButton className='justify-center'
          url={shareUrl}
          // quote={`${campaign.name} ${campaign.target_facebook.address}`}
          hashtag={`${campaign.name} ${facebookAddress} #pushthought`}
        >
          <FaFacebookF size={40} round={true} />
        </FacebookShareButton> */}
        <div>
          <FaFacebookF size={40} round={true}
            className='hover:cursor-pointer'
            onClick={fcClosed} />
        </div>
        {/* <IoCheckmarkCircleSharp
          style={{ color: "#018749", width: "24px", height: "24px", position: "relative", right: "25px", bottom: "4px" }}
          className={clsx({
            'show': isShowingFB,
            'hide': !isShowingFB
          })}
        /> */}
        <Image
          src={greenCheck}
          style={{ width: "24px", height: "24px", position: "relative", right: "30px", bottom: "4px" }}
          alt="Facebook"
          className={clsx({
            'show': isShowingFB,
            'hide': !isShowingFB
          })}
        />

        {/* <TwitterShareButton className='justify-center'
          url={shareUrl}
          // title={campaign.name}
          // title={social !== null && social.length > 0 && `${social[0]['Twitter']} ${campaign.name}`}
          title={`${twitterAddress} ${campaign.name}`}
          hashtags={[`pushthought`]}
          onShareWindowClose={xClosed}
        >
          <BsTwitterX size={40} round={true} />
        </TwitterShareButton> */}
        <div>
          <BsTwitterX size={40} round={true} className='hover:cursor-pointer' onClick={xClosed} />
        </div>
        {/* <ImCheckmark
          style={{ color: "#018749", width: "24px", height: "24px", position: "relative", right: "30px", bottom: "4px" }}
          className={clsx({
            'show': isShowingX,
            'hide': !isShowingX
          })}
        /> */}
        <Image
          src={greenCheck}
          style={{ width: "24px", height: "24px", position: "relative", right: "30px", bottom: "4px" }}
          alt="X"
          className={clsx({
            'show': isShowingX,
            'hide': !isShowingX
          })}
        />
      </div>
    </>
  )
}

export default ShareButtons
