import React from "react";
import { tagsData} from '../sample/tags-data';
import "../static/styles/Tags.css";
import MainLayout from "../components/MainLayout";
import Question from "../components/Question";

// Assume data is passed as a prop from a nextJS router, 
// with tagsData as the prop
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
    return (
      <MainLayout>
        <div className="tags_items">
          <div className="tags_items__header">
            Questions tagged [javascript]
          </div>
          <div className="tags_items__body">
            
            <Question data={question1}/> 
            <Question data={question1}/>
            <Question data={question1}/>
            <Question data={question1}/>
          </div>
        </div>
			</MainLayout>
    );
  }
}

export default Tags;