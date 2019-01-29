import React from "react";
import { taggedQuestions} from '../sample/tags-data';
import "../static/styles/Tags.css";
import MainLayout from "../components/MainLayout";
import Question from "../components/Question";

class Tags extends React.Component {
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
        <Question data={question1}/>
        <div>Hey World</div>
			</MainLayout>
    );
  }
}

export default Tags;