import React, { Component } from 'react'

import { getActiveSprint, getIssues } from './api'
import Story from './Components/Story'

import logo from './logo.svg'
import './App.css'


const getData = async () => {
  const { data: sprintData } = await getActiveSprint()
  const [activeSprint] = sprintData.values
  const { data: issuesData } = await getIssues(activeSprint.id)
  console.log(issuesData.issues)
  return issuesData.issues
}

class App extends Component {
  state = {
    issues: []
  }

  componentDidMount() {
    getData()
      .then(res => this.setState({ issues: res }))
      .catch(err => console.log(err))
  }

  render() {
    const { issues } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {
            issues.map(issue => {
              const { fields } = issue
              return (
                <Story
                  key={ issue.id }
                  status={ fields.status }
                  type={ fields.issuetype.iconUrl }
                  id={ issue.key }
                  avatar={ fields.assignee.avatarUrls }
                  title={ fields.summary }
                  epic={ fields.epic }
                  points={ fields.customfield_10013 }
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default App
