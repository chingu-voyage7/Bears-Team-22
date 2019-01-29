import React from "react";
import { tagsData} from '../sample/tags-data';
import "../static/styles/Tags.css";
import MainLayout from "../components/MainLayout";
import Question from "../components/Question";

// Assume data is passed as a prop from a nextJS router, 
// with tagsData as the prop
// Assume the props from `search.js` is passing two things
// 1. The tag ID to the tagname
// 2. tagsData state
class Tags extends React.Component {
  state = {
    questions: tagsData.questions
  }
  render() {
    const question1 = {
      title:"I'm a question!",
      authorId:"5c47351ed4478b0010b20b56",
      tags:[{"name":"reddit"},{"name":"javascript"}],
      createdAt:"2019-01-22T15:22:06.578Z",
      body:"Look at me I'm a question"
    }
    const chosenTagName = 'javascript'; // localhost:3000/tags/javascript
    return (
      <MainLayout>
        <div className="tags_items">
          <div className="tags_items__header">
            Questions tagged [javascript]
          </div>
          <div className="tags_items__body">
            {/*Not sure why this doesn't work. Should extract all questions matching "javascript"}*/}
            {/*{this.state.questions.filter(item => {
              let flag = item.tags.filter(el => el['name'] == chosenTagName).length > 0;
              return flag ? <Question data={question1}/>: false
            })}*/}
          </div>
        </div>
			</MainLayout>
    );
  }
}

export default Tags;