import React, { Component } from 'react'

import { getActiveSprint, getIssues } from './api'
import Timeline from './Components/Timeline'

import logo from './logo.svg'
import './App.css'
import mockActiveSprint from './Mock/activeSprint'
import mockIssues from './Mock/issues'

const getData = async () => {
  const { data: sprintData } = await getActiveSprint()
  const [activeSprint] = sprintData.values
  const { data: issuesData } = await getIssues(activeSprint.id)
  return {
    sprintId: activeSprint.id,
    sprintStart: activeSprint.startDate,
    sprintEnd: activeSprint.endDate,
    issues: issuesData.issues
  }
}

const getMockData = async () => {
  const [activeSprint] = mockActiveSprint.values
  return {
    sprintId: activeSprint.id,
    sprintStart: activeSprint.startDate,
    sprintEnd: activeSprint.endDate,
    issues: mockIssues.issues
  }
}

class App extends Component {
  state = {
    loading: true,
    sprintId: null,
    sprintStart: null,
    sprintEnd: null,
    issues: []
  }

  componentDidMount() {
    getMockData()
      .then(({ sprintId, sprintStart, sprintEnd, issues }) => {
        this.setState({ loading: false, sprintId, sprintStart, sprintEnd, issues })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { loading, sprintId, sprintStart, sprintEnd, issues } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        { !loading && (
          <div className="App-body">
            <Timeline
              sprintId={ sprintId }
              sprintStart={ sprintStart }
              sprintEnd={ sprintEnd }
              issues={ issues }
            />
          </div>
        )}
      </div>
    )
  }
}

export default App
