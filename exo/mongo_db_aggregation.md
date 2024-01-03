```js
// 1. Trouvez les 10 annonces les plus commentées avec listing_url, nom, pays, note de satisfaction dans la collection listingsAndReviews.

db.listingsAndReviews.aggregate([
  { 
    $sort: { "reviews.number_of_reviews": -1 } 
  },
  { 
    $limit: 10 
  },
  { 
    $project: { 
      _id: 0, 
      listing_url: 1, 
      name: 1, 
      address: 1, 
      country: 1, 
      "reviews.scores.review_scores_rating": 1 
    } 
  }
])

// 2. Trouvez toutes les annonces avec listing_url, nom, type de propriété, type de lit, aménités, prix dans la collection listingsAndReviews qui ont un vrai lit comme type de lit et une aménité de cuisine.

db.listingsAndReviews.aggregate([
  { 
    $match: { "beds.bed_type": "Real Bed", amenities: { $regex: /kitchen/i } } 
  },
  { 
    $project: { 
      _id: 0, 
      listing_url: 1, 
      name: 1, 
      property_type: 1, 
      "beds.bed_type": 1, 
      amenities: 1, 
      price: 1 
    } 
  }
])

// 3. Trouvez toutes les annonces avec listing_url, nom, type de propriété, lit, prix, dépôt de garantie dans la collection listingsAndReviews qui ont un prix supérieur à 500 $ et un dépôt de garantie de 1000 $ ou plus.

db.listingsAndReviews.aggregate([
  { 
    $match: { price: { $gt: 500 }, "pricing.security_deposit": { $gte: 1000 } } 
  },
  { 
    $project: { 
      _id: 0, 
      listing_url: 1, 
      name: 1, 
      property_type: 1, 
      beds: 1, 
      price: 1, 
      "pricing.security_deposit": 1 
    } 
  }
])

// 4. Trouvez toutes les annonces avec listing_url, nom, type de propriété, lit, prix, invités inclus dans la collection listingsAndReviews qui ont un maximum de 5 invités inclus dans le prix.

db.listingsAndReviews.aggregate([
  { 
    $match: { "accommodates": { $lte: 5 } } 
  },
  { 
    $project: { 
      _id: 0, 
      listing_url: 1, 
      name: 1, 
      property_type: 1, 
      beds: 1, 
      price: 1, 
      accommodates: 1 
    } 
  }
])

// 5. Trouvez toutes les annonces avec listing_url, nom, type de propriété, lit, salles de bains, prix dans la collection listingsAndReviews qui ont un minimum de 2 salles de bains.

db.listingsAndReviews.aggregate([
  { 
    $match: { "bathrooms": { $gte: 2 } } 
  },
  { 
    $project: { 
      _id: 0, 
      listing_url: 1, 
      name: 1, 
      property_type: 1, 
      beds: 1, 
      bathrooms: 1, 
      price: 1 
    } 
  }
])

// 6. Écrivez une requête MongoDB pour trouver l'URL de la liste, le nom, l'adresse, les vérifications de l'hôte et la taille de la vérification de l'hôte sous-document dans la collection listingsAndReviews.

db.listingsAndReviews.aggregate([
  { 
    $project: { 
      _id: 0, 
      listing_url: 1, 
      name: 1, 
      address: 1, 
      "host_verifications": 1, 
      "host_verifications.$size": "host_verifications" 
    } 
  }
])

// 7. Trouvez toutes les annonces avec listing_url, nom, adresse, vérification de l'hôte et la taille du tableau de vérification de l'hôte dans la collection listingsAndReviews qui ont un hôte avec au moins 3 vérifications.

db.listingsAndReviews.aggregate([
  { 
    $match: { "host_verifications": { $exists: true, $size: { $gte: 3 } } } 
  },
  { 
    $project: { 
      _id: 0, 
      listing_url: 1, 
      name: 1, 
      address: 1, 
      "host_verifications": 1, 
      "host_verifications.$size": "host_verifications" 
    } 
  }
])
```