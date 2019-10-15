import React, { Component } from 'react'
import { CustomInput, Button, Label, Input, Table, Progress, Collapse, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select, { components } from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled';
import SyncIcon from '@material-ui/icons/Sync';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import DesktopAccessDisabledIcon from '@material-ui/icons/DesktopAccessDisabled';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
//import FastForwardIcon from '@material-ui/icons/FastForward';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import PictureInPictureAltIcon from '@material-ui/icons/PictureInPictureAlt';
import jpplaylist from './playlist';
import chiplaylist from './chiplaylist';
import chianimateplaylist from './chianimateplaylist';
//import youtubeplaylist from './youtubeplaylist';
import './reset.css'
import './defaults.css'
import './range.css'
import './App.css'
import ReactPlayer from './ReactPlayer'
// bootstrap ag-grid-community load-script
//import axios from 'axios';
//import Duration from './Duration'
const playlist= jpplaylist;
chiplaylist.map((index, key) => {
  playlist.push({ label:index.label,options:index.options })
})

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  expand_less: {
    marginRight: theme.spacing(1),
  },
  expand_more: {
    marginRight: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      pip: false,
      playing: true,
      controls: false,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,
      hide: false,
      title: null,
      collapse: true,
      dark: false,
      random: false,
      showModal: false,
      columnDefs: [
        {
          headerName: "Title", field: "next"
        },
        {
          headerName: "Artist", field: "artist"
        },
        {
          headerName: "Source", field: "source"
        },
      ],
      rowData: [],
      rowSelection: "multiple"
    };
    this.handleToggleControls = this.handleToggleControls.bind(this);
    this.handleUpdatePlaylist = this.handleUpdatePlaylist.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    })
  }

  /*componentDidMount() {

  }*/

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handleStop = () => {
    this.setState({ url: null, playing: false, title: null })
    const tmp = []
    this.setState({ rowData: tmp })
    this.gridApi.setRowData(this.state.rowData)
  }

  handleNext = () => {
    this.player.seekTo(0.99999999)
  }

  handleToggleControls() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }

  handleToggleHide = () => {
    this.setState({ hide: !this.state.hide })
    document.getElementById("player-wrapper").style.display === "none" ? document.getElementById("player-wrapper").style.display = "block" : document.getElementById("player-wrapper").style.display = "none"
  }

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  handleDarkMode = () => {
    this.setState({ dark: !this.state.dark });
    if (this.state.dark) {
      document.body.className = '';
      document.getElementById('playlistGrid').className = 'ag-theme-balham';
    } else {
      document.body.className = 'dark';
      document.getElementById('playlistGrid').className = 'ag-theme-balham-dark';
    }
  }

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  handleToggleModal() {
    this.setState({ showModal: !this.state.showModal })
  }

  handleSetPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  /*handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip })
  }*/

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  /*handleEnablePIP = () => {
    console.log('onEnablePIP')
    this.setState({ pip: true })
  }

  handleDisablePIP = () => {
    console.log('onDisablePIP')
    this.setState({ pip: false })
  }*/

  handlePause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }

  handleSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  handleSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  handleProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleEnded = () => {
    console.log('onEnded')
    const tmp = this.state.rowData
    if (tmp === undefined || tmp.length == 0)
      this.setState({ playing: this.state.loop })
    else
      if (this.state.loop)
        this.setState({ playing: this.state.loop })
      else {
        tmp.shift()
        this.setState({ rowData: tmp })
        this.gridApi.setRowData(this.state.rowData)
        if (this.state.rowData.length !== 0)
          if (this.state.random){
            const randplaylistonrow = Math.floor(Math.random() * (Object.keys(tmp).length));
            const randselected = tmp.splice(randplaylistonrow, 1)
            console.log(randselected)
            tmp.splice(0,0,{artist:randselected[0].artist,next:randselected[0].next,source:randselected[0].source})
            console.log(tmp)
            this.setState({ rowData: tmp })
            this.gridApi.setRowData(this.state.rowData)
            this.setState({ url: this.state.rowData[0].source })
          }
          else
          this.setState({ url: this.state.rowData[0].source })
        else if (this.state.random) {
          //random draw and play
          const randplaylist = Math.floor(Math.random() * (Object.keys(playlist).length));
          const randsong = Math.floor(Math.random() * (playlist[randplaylist].options.length));
          tmp.push({ artist: playlist[randplaylist].options[randsong].artist, next: playlist[randplaylist].options[randsong].label, source: playlist[randplaylist].options[randsong].url })
          this.setState({ rowData: tmp })
          this.gridApi.setRowData(this.state.rowData)
          this.setState({ url: this.state.rowData[0].source })
        }
      }
  }

  handleDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  handleUpdatePlaylist(value) {
    const tmpData = this.state.rowData;
    playlist.map((index, key) => {
      index.options.map((innerindex, innerkey) => {
        if (innerindex.label === value.label)
          tmpData.push({ artist: innerindex.artist, next: innerindex.label, source: innerindex.url })
      })
    })
    this.setState({ rowData: tmpData })
    this.gridApi.setRowData(this.state.rowData);
  }

  handleRandom = () =>{
    this.setState({ random: !this.state.random })
    if(!this.state.random){
      const tmp = this.state.rowData
      console.log("run random")
      console.log(this.state.playing)
      if (!this.state.playing || (tmp === undefined || tmp.length == 0)) {
        //random draw and play
        const randplaylist = Math.floor(Math.random() * (Object.keys(playlist).length));
        const randsong = Math.floor(Math.random() * (playlist[randplaylist].options.length));
        //update grid and load
        tmp.push({ artist: playlist[randplaylist].options[randsong].artist, next: playlist[randplaylist].options[randsong].label, source: playlist[randplaylist].options[randsong].url })
        this.setState({ rowData: tmp })
        this.gridApi.setRowData(this.state.rowData)
        this.setState({ url: this.state.rowData[0].source })
      }
    }
  }

  onRemoveSelected() {
    var selectedData = this.gridApi.getSelectedRows();
    const tmp = this.state.rowData
    tmp.map((index, key) => {
      if (index.next === selectedData[0].next)
        tmp.splice(key, 1)
    })
    this.setState({ rowData: tmp })
    this.gridApi.setRowData(this.state.rowData);
    console.log(this.state.rowData)
  }

  renderLoadButton = (url, label) => {
    return (
      <Button outline onClick={() => this.load(url)}>
        {label}
      </Button>
    )
  }

  ref = player => {
    this.player = player
  }

  render() {
    const classes = useStyles;
    const { url, playing, controls, light, volume, muted, loop, hide, played, loaded, duration, playbackRate, pip, title, dark ,random,} = this.state
    /*if (url !== null && playing) {
      axios.get('https://noembed.com/embed?url=' + url)
        .then(response => this.setState({ title: response.data.title }))
    }*/
    /*let optionplaylist = []
    youtubeplaylist.map((index, key) => {
      optionplaylist.push({ value: index.source, label: index.list })
    })*/
    let cusComponents = {};
    const MenuList = props => {
      return (
        <components.MenuList {...props}>
          {props.children}
          <a href="#"
            style={menuHeaderStyle}
            onClick={(e) => { this.handleToggleModal(); e.preventDefault(); e.stopPropagation(); }}>
            Custom Add</a>
        </components.MenuList>
      );
    };
    cusComponents = { components: { MenuList } };
    const menuHeaderStyle = {
      padding: '4px 12px',
      display: 'flex',
      margin: '0px auto',
      background: "#4dbd74",
      color: 'white',
    };

    return (
      <div className='app' >
        <section className='section'>
          <div className='player-wrapper' id='player-wrapper' >
            <ReactPlayer
              ref={this.ref}
              className='react-player'
              width='100%'
              height='100%'
              url={url}
              pip={pip}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={this.handlePlay}
              onEnablePIP={this.handleEnablePIP}
              onDisablePIP={this.handleDisablePIP}
              onPause={this.handlePause}
              onBuffer={() => console.log('onBuffer')}
              onSeek={e => console.log('onSeek', e)}
              onEnded={this.handleEnded}
              onError={e => console.log('onError', e)}
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}
            />
          
          <br />
          <Row>
            <Col align="center">
              <Button onClick={this.handleStop} color="info"><StopIcon /></Button>
              <Button onClick={this.handlePlayPause} color="warning">{playing ? <PauseIcon /> : <PlayArrowIcon />}</Button>
              <Button onClick={this.handleNext} color="danger"><SkipNextIcon /></Button>
              {/*<Button onClick={this.handleSetPlaybackRate} color="primary"
                value={(this.state.playbackRate === 2) ? 1 : ((this.state.playbackRate === 1) ? 1.5 : 2)}
              >
                <FastForwardIcon />
      </Button>*/}
              <Button onClick={this.handleRandom}>{random?<ShuffleIcon />:<SyncAltIcon />}</Button>
              <Button onClick={this.handleToggleMuted}>{muted ? <VolumeOffIcon /> : <VolumeUpIcon />}</Button>
              <Button onClick={this.handleToggleLoop}>{loop ? <SyncDisabledIcon /> : <SyncIcon />}</Button>
              <Button onClick={this.handleToggleHide}>{hide ? <DesktopAccessDisabledIcon /> : <DesktopWindowsIcon />}</Button>
              <Button onClick={this.handleDarkMode} >{dark ? <FeaturedPlayListIcon /> : <PictureInPictureAltIcon />}</Button>

              {//ReactPlayer.canEnablePIP(url) &&
                //<Button onClick={this.handleTogglePIP}>{pip ? 'Disable PiP' : 'Enable PiP'}</Button>
              }
            </Col>
          </Row>
          <br />
          <Table id="table" borderless>
            <thread>
              <tr>
                <th>Progress</th>
                <td>
                  <CustomInput type="range" min={0} max={1} step='any'
                    value={played}
                    onMouseDown={this.handleSeekMouseDown}
                    onChange={this.handleSeekChange}
                    onMouseUp={this.handleSeekMouseUp}
                  />
                </td>
              </tr>
              <tr>
                <th>Volume</th>
                <td>
                  <CustomInput type="range" min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} />
                </td>
              </tr>
              {/*<tr>
                <th>Played</th>
                <td><Progress color="warning" max={1} value={played} /></td>
              </tr>*/}
              <tr>
                <th>Playlist</th>
                <td>
                  <div
                    id="playlistGrid"
                    className="ag-theme-balham"
                    style={{
                      height: "100%",
                      width: '100%'
                    }}
                  >
                    <AgGridReact
                      columnDefs={this.state.columnDefs}
                      rowData={this.state.rowData}
                      domLayout="autoHeight"
                      onGridReady={this.onGridReady}
                      rowSelection={this.state.rowSelection}
                    >
                    </AgGridReact>
                  </div>
                </td>
              </tr>
              <Collapse isOpen={this.state.collapse}>
                <tr>
                  <th></th><td>
                    <Button onClick={this.onRemoveSelected.bind(this)}>Remove Selected</Button>
                    <Button outline color="success"
                      onClick={() => this.setState({ url: this.state.rowData[0].source, playing: true })}>
                      Play
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th>Add to Playlist</th>
                  <td className="selecttd">
                    <Select
                      {...cusComponents}
                      options={playlist}
                      onChange={(e) => this.handleUpdatePlaylist(e)}
                    >
                    </Select>
                  </td>
                </tr>
                {/*<tr>
                  <th>YouTube Playlist</th>
                  <td className="selecttd">
                    <Select
                      isSearchable
                      options={optionplaylist}
                      onChange={(e) => this.load(e.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Custom URL</th>
                  <td>
                    <div>
                      <Input ref={input => { this.urlInput = input }} type="text" placeholder='Enter URL' size="40" />
                      <Button id="customurl" outline color="success"
                        onClick={() => this.setState({ url: this.urlInput.value })}>
                        Load
                    </Button>
                    </div>
                  </td>
                </tr>*/}
              </Collapse>
            </thread>
          </Table>
          <Fab onClick={this.handleToggleControls} variant="extended" aria-label="delete" className={classes.fab}>
            {(this.state.collapse) ?
              <ExpandLessIcon className={classes.expand_less} /> : <ExpandMoreIcon className={classes.expand_more} />}
            {(this.state.collapse) ? 'Hide' : 'Details'}
          </Fab>
          <Modal isOpen={this.state.showModal} toggle={this.handleToggleModal}>
            <ModalHeader toggle={this.handleToggleModal}>Playlist Menu</ModalHeader>
            <ModalBody >
             
            </ModalBody>
          </Modal>
          </div>
        </section>
      </div >
    );
  }
}

export default App