1. **Annonces avec property_type "Maison":**
   ```js
   db.listingsAndReviews.find({
       "property_type": "House"
   })
   ```

2. **Annonces avec prix par nuit > $500:**
   ```js
   db.listingsAndReviews.find({
       "price": { 
           $gt: 500 
       }
   }, {
       "listing_url": 1,
       "name": 1,
       "host.name": 1,
       "host.location": 1,
       "reviews.reviewer_name": 1,
       "price": 1
   })
   ```

3. **Annonces au Brésil avec satisfaction >= 9:**
   ```js
   db.listingsAndReviews.find({
       "address.country": "Brazil",
       "review_scores.review_scores_rating": { 
           $gte: 9 
       }
   }, {
       "name": 1,
       "address": 1,
       "review_scores.review_scores_rating": 1
   })
   ```

4. **Annonces aux États-Unis avec jacuzzi:**
   ```js
   db.listingsAndReviews.find({
       "address.country": "United States",
       "amenities": "bathtub"
   }, {
       "name": 1,
       "address": 1,
       "reviews.reviewer_name": 1,
       "review_scores.review_scores_rating": 1
   })
   ```

5. **Annonces avec une piscine et prix entre $200 et $400:**
   ```js
   db.listingsAndReviews.find({
       "amenities": "piscine",
       "price": { 
           $gte: 200, 
           $lte: 400 
       }
   }, {
       "name": 1,
       "amenities": 1,
       "price": 1
   })
   ```

6. **Annonces avec un lave-linge au Canada ou au Mexique:**
   ```js
   db.listingsAndReviews.find({
       "amenities": "washing-machine",
       "address.country": { 
           $in: [
               "Canada", 
               "Mexique"
           ] 
       }
   }, {
       "name": 1,
       "amenities": 1,
       "address": 1
   })
   ```

7. **Annonces avec une cheminée et satisfaction >= 8:**
   ```js
   db.listingsAndReviews.find({
       "amenities": "chimney",
       "review_scores.review_scores_rating": { 
           $gte: 8 
       }
   }, {
       "listing_url": 1,
       "name": 1,
       "address": 1,
       "review_scores.review_scores_rating": 1
   })
   ```

8. **Annonces avec un lave-linge en italia ou en Espagne:**
   ```js
   db.listingsAndReviews.find({
       "amenities": "washing-machine",
       "address.country": { 
           $in: [
               "italia", 
               "spain"
           ] 
       }
   }, {
       "listing_url": 1,
       "name": 1,
       "address": 1,
       "amenities": 1,
       "review_scores.review_scores_rating": 1
   })
   ```

9. **Annonces avec les prix par nuit les plus élevés:**
   ```js
   db.listingsAndReviews.find({}, {
       "listing_url": 1,
       "name": 1,
       "address": 1,
       "amenities": 1,
       "price": 1,
       "review_scores.review_scores_rating": 1
   }).sort({ "price": -1 }).limit(1)
   ```

10. **Annonces avec les prix par nuit les plus bas:**
    ```js
    db.listingsAndReviews.find({}, {
        "listing_url": 1,
        "name": 1,
        "address": 1,
        "amenities": 1,
        "price": 1,
        "review_scores.review_scores_rating": 1
    }).sort({ "price": 1 }).limit(1)
    ```

11. **Annonces avec number_of_reviews égal à 0:**
    ```js
    db.listingsAndReviews.find({
        "reviews.number_of_reviews": 0
    }, {
        "name": 1,
        "address": 1,
        "reviews.reviewer_name": 1,
        "review_scores.review_scores_rating": 1
    })
    ```