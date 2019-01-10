// original data model
// state = {
// 	questions: {
// 		8863: {
// 			by: "dhouston",
// 			descendants: 71,
// 			id: 8863,
// 			kids: [8952, 9224, 8917],
// 			score: 111,
// 			time: 1175714200,
// 			title: "My YC app: Dropbox - Throw away your USB drive",
// 			type: "story",
// 			url: "http://www.getdropbox.com/u/2/screencast.html"
// 		}
// 	},
// 	comments: {
// 		2921983: {
// 			by: "norvig",
// 			id: 2921983,
// 			parent: 2921506,
// 			kids: [2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141],
// 			text:
// 				"Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
// 			time: 1314211127,
// 			type: "comment"
// 		},
// 		35156123: {
// 			by: "vincentntang",
// 			id: 35156123,
// 			parent: 2921506,
// 			kids: [2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141],
// 			text: "Look at me ma I'm a comment!",
// 			time: 131411555,
// 			// use unix based time
// 			type: "comment"
// 		}
// 	}
// };

// newer mocked data from swagger
 export const	questions =  {
  8863: {
    createdAt: "2015-05-15",
    updatedAt: "2017-10-02",
    body: "lorem ipsum lorem ipsum",
    authorId: 8863,
    // replyId: "1115555",
    title: "My YC app: Dropbox - Throw away your USB drive",
    tags: ["ycombinator", "dropbox"]
  },
  8864: {
    createdAt: "2016-05-15",
    updatedAt: "2016-10-02",
    body: "lorem ipsum lorem ipsum",
    authorId: 8863,
    // replyId: "1115555",
    title: "My first hello world app!",
    tags: ["programming", "javascript"]
  },
  8866: {
    createdAt: "2018-05-15",
    updatedAt: "2018-10-02",
    body: "lorem ipsum lorem ipsum",
    authorId: 8863,
    // replyId: "1115555",
    title: "I made a thing",
    tags: ["programming", "awesome"]
  }
},

export const reply = {
  2921983: {
    createdAt: "2015-05-15",
    updatedAt: "2017-10-02",
    body: "lorem ipsum lorem ipsum"1,
    authorId: 555123,
    // replyId: "1115555",
    questionId: 8863
  },
  2921984: {
    createdAt: "2015-05-15",
    updatedAt: "2017-10-02",
    body: "lorem ipsum lorem ipsum2",
    authorId: 555124,
    // replyId: "1115555",
    questionId: 8863
  },
  2921985: {
    createdAt: "2015-05-15",
    updatedAt: "2017-10-02",
    body: "lorem ipsum lorem ipsum3",
    authorId: 555125,
    // replyId: "1115555",
    questionId: 8863
  },
  2921986: {
    createdAt: "2015-05-15",
    updatedAt: "2017-10-02",
    body: "lorem ipsum lorem ipsum3",
    authorId: 555126,
    // replyId: "1115555",
    questionId: 8864
  }
}
