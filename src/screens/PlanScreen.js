import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";
import { loadStripe } from "@stripe/stripe-js";
import "./PlanScreen.css";

function PlanScreen() {
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true) //were getting only the active products from the collection
      .get() //get() will return the collection
      .then((querySnapshot) => {
        const products = {};
        //the snapshot will is an array of all the products so it is the collection itself
        //so we will loop through it to get each product individually
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data(); //we add a key/value pair  to products object using product id so each prod has unique key
          //if you recall each product document has price object - take a look at the products collection/document in firestore
          //must reference the product to access its object field
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              //with that , you basically update products object using same key but this time add a prices using dot notation which is also an object by itself
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  const loadCheckout = async (priceId) => {
    //this should redirect to stripe payment gateway page
    //alert(priceId);
    const docRef = await db
      .collection("customers")
      .doc(user.uid) // well you can call doc() on the collection to get user by id
      .collection("checkout_sessions") //here we created the checkout sessions collections and add datat to it - yea this this how you add a collection to an existing collection
      .add({
        //we add data to checkout session we just created. get() would get data from it. since we are creating we call add()
        price: priceId,
        success_url: window.location.origin, //we define where you want to redirect the user after they checkout
        cancel_url: window.location.origin,
      });
    //firebase will see user's intent and will come back with a session and store in docRef

    docRef.onSnapshot(async (snapshot) => {
      const { error, sessionId } = snapshot.data();

      if (error) {
        //show an error to your customer and inspect your cloudn function logs in the firebase console.
        alert(`an error occurred:${error}`);
      }
      if (sessionId) {
        //we have a session, let's redirect to checkout
        //Init stripe for this let's install stripe js npm install @stripe/stripe-js

        const stripe = await loadStripe(
          "pk_test_sAU0q7zJigw6fGlziKS3QcAk00l3o3vhKH"
        );

        stripe.redirectToCheckout({ sessionId }); //this should redirect user to the stripe check out page and should come back to whether successful or not
      }
    });
  };

  //Let's get the role for each subscribed users
  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions") //yes, you can collection if that specific collection has object fields -subscription is object field of customers so...
      .get() //will return a promise, so we call then() on it
      .then((snapshot) => {
        //always return a snapshot
        snapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_end.start,
          }); //we initially set this null so we can just init with an {}, data() will return an object. just get the
        });
      });
  }, [user.uid]);

  console.log(subscription);
  console.log(products);
  //Remember you call entries() on object to convert it to array as you can't loop through an object. you can only loop through an array
  //FYI, you convert an array to object using Object.fromEntries(arr) or Ojbect.assign({}, arr)
  return (
    <div className="planScreen">
      {Object.entries(products).map(([productId, productData]) => {
        //Add some logic to check if subscription is active
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div className="planScreen__plan">
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button onClick={() => loadCheckout(productData.prices?.priceId)}>
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlanScreen;
