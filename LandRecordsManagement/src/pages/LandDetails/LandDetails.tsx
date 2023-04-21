import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import { getMyLandRecords } from "../../utils/lands";
import LoginContext from "../../contexts/LoginContext";
import { Loader } from "../../components";
import { getDataAsUrl } from "../../utils/ipfs";
import NotFound from "../../components/NotFound/NotFound";

const LandDetails = () => {
  const [lands , setLands] = useState([]);
  const { accounts, landContract} = useContext(LoginContext);
  const [loading , setLoading] = useState(false);


  const [selectedLand, setSelectedLand] = useState(null);
  const [documentUrl , setDocumentUrl] = useState('');


   
  const openModal = (land) => {
    console.log(land);
   (async ()=>{
    const url = await getDataAsUrl(land.recordHash , 'image/jpeg');
    console.log(url);
    setDocumentUrl(url);
    setSelectedLand(land);
   })();
   
   
  };

  const closeModal = () => {
    setSelectedLand(null);
  };


  useEffect(()=>{
    setLoading(true);
    (async () => {
      const data = await getMyLandRecords(landContract , accounts);
      if(data) setLands(data);
      setLoading(false);
    })();

  } , [accounts]);

  console.log('lands :>> ', lands);

  if(loading) return <Loader/>
  if(lands.length == 0) return <NotFound message = {"You haven't added any Land"} />
  return (
    <div className="land-details-container">
      {lands.map((land, index) => (
        <div key={index} className="land-details-card">
          <div className="land-details-row">
            <span className="land-details-label">State:</span>
            <span className="land-details-value">{land.location.state}</span>
          </div>
          <div className="land-details-row">
            <span className="land-details-label">District:</span>
            <span className="land-details-value">{land.location.district}</span>
          </div>
          <div className="land-details-row">
            <span className="land-details-label">Village:</span>
            <span className="land-details-value">{land.location.village}</span>
          </div>
          <div className="land-details-row">
            <span className="land-details-label">Tehsil:</span>
            <span className="land-details-value">{land.location.tehsil}</span>
          </div>
          <div className="land-details-row">
            <span className="land-details-label">Pincode:</span>
            <span className="land-details-value">{land.location.pincode}</span>
          </div>
          <div className="land-details-row">
            <span className="land-details-label">Latitude:</span>
            <span className="land-details-value">{land.location.latitude}</span>
          </div>
          <div className="land-details-row">
            <span className="land-details-label">Longitude:</span>
            <span className="land-details-value">{land.location.longitude}</span>
          </div>
          <div className="land-details-row">
            <span className="land-details-label">Area:</span>
            <span className="land-details-value">{land.location.area} sq. ft.</span>
          </div>
          <div className="land-details-row">
            <span className="land-details-label">Mutation Number:</span>
            <span className="land-details-value">{land.mutationNumber}</span>
          </div>
          <div className="land-details-row">
            <span className="land-details-label">Current Price:</span>
            <span className="land-details-value">{land.price}</span>
          </div>
          <div className="land-details-row">
            <span className="land-details-label">Is for Sale:</span>
            <span className="land-details-value">{land.isForSale ? 'Yes' : 'No'}</span>
          </div>
          <div className="land-details-row">
            <span className="land-details-label">Verification Status:</span>
            <span
              className={`land-details-value ${
                land.isVerified ? "verified" : "unverified"
              }`}
            >
              {land.isVerified ? "Verified" : "Not Verified"}
            </span>
          </div>
     


          <div className="land-details-row">
            <button onClick={() => openModal(land)}>View Document</button>
          </div>
        </div>
      ))}
      {selectedLand && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedLand.location.state} Land Document</h2>
            <p>
              This is the document for the land in {selectedLand.location.village},{" "}
              {selectedLand.location.tehsil}, {selectedLand.location.district}.
            </p>
              <img className="land-document-image" src= {documentUrl} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandDetails;
