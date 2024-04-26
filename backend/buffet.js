//aggregation
const postAggregation=[
    {
      '$lookup': {
        'from': 'sociallikes', 
        'localField': '_id', 
        'foreignField': 'postId', 
        'as': 'likes'
      }
    }, {
      '$lookup': {
        'from': 'socialcomments', 
        'localField': '_id', 
        'foreignField': 'postId', 
        'as': 'comment', 
        'pipeline': [
          {
            '$lookup': {
              'from': 'users', 
              'localField': 'author', 
              'foreignField': '_id', 
              'as': 'commentUser'
            }
          }
        ]
      }
    }, {
      '$lookup': {
        'from': 'users', 
        'localField': 'author', 
        'foreignField': '_id', 
        'as': 'owner'
      }
    }, {
      '$project': {
        'author': 0
      }
    }, {
      '$addFields': {
        'likesCount': {
          '$size': '$likes'
        }
      }
    }
  ]


  //followersAggregation
  const followersAggregation =
  [
    {
      '$match': {
        'username': 'sahil'
      }
    }, {
      '$lookup': {
        'from': 'socialfollows', 
        'localField': '_id', 
        'foreignField': 'followeeId', 
        'as': 'follower', 
        'pipeline': [
          {
            '$lookup': {
              'from': 'users', 
              'localField': 'followerId', 
              'foreignField': '_id', 
              'as': 'followerProfile'
            }
          }
        ]
      }
    }
  ]

