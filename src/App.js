import React, { Component, useState } from 'react'
import { UncontrolledTooltip, Alert, CustomInput, Button, Label, Input, Table, Progress, Collapse, Row, Col, Modal, ModalHeader, ModalBody, TabContent, TabPane, Nav, NavItem, NavLink, ModalFooter, } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import IconButton from '@material-ui/core/IconButton';
import Select, { components } from 'react-select';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import PictureInPictureAltIcon from '@material-ui/icons/PictureInPictureAlt';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import database from './database';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
//import youtubeplaylist from './youtubeplaylist';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import classnames from 'classnames';
import './reset.css'
import './defaults.css'
import './range.css'
import './App.css'
import ReactPlayer from './ReactPlayer'
import CustomHeaderGroup from "./customHeaderGroup.js";
import swal from 'sweetalert';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
let playlist = []
if (JSON.parse(localStorage.getItem('playlist')) === null) {
  let databaseplaylist = []
  database.map((index, key) => {
    index.options.map((song, number) => {
      databaseplaylist.push({ label: song.label, artist: song.artist, album: index.label, url: song.url })
    })
  })
  playlist = databaseplaylist
}
else {
  playlist = JSON.parse(localStorage.getItem('playlist'))
}
let gridplaylist = []
if (JSON.parse(localStorage.getItem('gridplaylist')) !== null)
gridplaylist = JSON.parse(localStorage.getItem('gridplaylist'))

let databaseplaylist = []
if (JSON.parse(localStorage.getItem('databaseplaylist')) === null) {
  database.map((index, key) => {
    index.options.map((song, number) => {
      databaseplaylist.push({ label: song.label, artist: song.artist, album: index.label, url: song.url })
    })
  })
}
else {
  databaseplaylist = JSON.parse(localStorage.getItem('databaseplaylist'))
}
let filterartistlist = []
database.map((index, key) => {
  index.options.map((song, number) => {
    filterartistlist.push({ label: song.artist, value: song.artist })
  })
})
let artistlist = filterartistlist.reduce((unique, o) => {
  if (!unique.some(obj => obj.label === o.label && obj.value === o.value)) {
    unique.push(o);
  }
  return unique;
}, [])
let albumlist = []
database.map((index, key) => {
  albumlist.push({ label: index.label, value: index.label })
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
  root: {
    width: 200,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    white: {
      color: '#fff',
    },
    black: {
      color: '#000',
    },
  },
});

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
      playingTitle: '',
      activeTab: '1',
      AblumSelect: '',
      ArtistSelect: '',
      AddName: '',
      AddSource: '',
      columnDefs: [
        {
          headerName: "Playlist",
          headerGroupComponent: "customHeaderGroupComponent",
          children: [
            {
              headerName: "", field: "delete", width: 40,
              cellRendererFramework: (props) => {
                return (
                  <IconButton aria-label="delete" className={useStyles.margin} size="small" onClick={this.onRemoveSelected.bind(this)}>
                    <DeleteTwoToneIcon color="secondary" fontSize="inherit" />
                  </IconButton>
                )
              }
            },
            {
              headerName: "Title", field: "next",
            },
            {
              headerName: "Artist", field: "artist"
            },
            {
              headerName: "Source", field: "source", hide: true
            },
          ],
        },
      ],
      frameworkComponents: { customHeaderGroupComponent: CustomHeaderGroup },
      rowData: gridplaylist,
      rowSelection: "multiple"
    };
    this.handleToggleControls = this.handleToggleControls.bind(this);
    this.handleUpdatePlaylist = this.handleUpdatePlaylist.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.handlePlayInGrid = this.handlePlayInGrid.bind(this);
    this.handleSaveListInGrid = this.handleSaveListInGrid.bind(this);
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
      pip: false,
      playingTitle: this.state.rowData[0].next
    })
  }

  /*componentDidMount() {
 
  }*/

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handleStop = () => {
    this.setState({ url: null, playing: false, playingTitle: null })
    const tmp = []
    this.setState({ rowData: tmp })
    this.gridApi.setRowData(this.state.rowData)
  }

  handleNext = () => {
    this.player.seekTo(0.99999999)
  }

  handleBack = () => {
    this.player.seekTo(0.00000001)
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

  handleVolumeChange = (event, newValue) => {
    this.setState({ volume: newValue / 100 })
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
    this.state.muted ?
      this.setState({ muted: !this.state.muted, volume: 0.8 })
      :
      this.setState({ muted: !this.state.muted, volume: 0 })
  }

  handleToggleModal() {
    this.setState({ showModal: !this.state.showModal })
    if (!this.state.showModal) {
      switch (this.state.activeTab) {
        case '1':
            if (JSON.parse(localStorage.getItem('user')) === null)
          swal("Adding to List", "Choose songs by checkboxes and add to playlist.");
          break;
        case '2':
            if (JSON.parse(localStorage.getItem('databaseplaylist')) === null)
          swal("Adding to Database", "Input song information and add to database.");
          break;
        case '3':
            if (JSON.parse(localStorage.getItem('playlist')) === null)
          swal("Customize Random", "Choose songs for random, system will store your choices and random your choices only.");
          break;
      }
    }
  }

  handleSetPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

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

  handleSaveListInGrid= () => {
    if (this.state.rowData.length !== 0) {
      localStorage.setItem('gridplaylist', JSON.stringify(this.state.rowData))
      swal("Saved", "Default playlist are saved", "success")
    }
    else {
      localStorage.setItem('gridplaylist', JSON.stringify(this.state.rowData))
      swal("Saved", "Nothing in Playlist.So the default playlist is null", "success")
    }
  }

  handlePlayInGrid= () => {
    if (this.state.rowData.length !== 0)
      this.setState({ url: this.state.rowData[0].source, playing: true, playingTitle: this.state.rowData[0].next })
    else
      swal("Warning", "Nothing in Playlist.", "warning")
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
          if (this.state.random) {
            const randplaylistonrow = Math.floor(Math.random() * (Object.keys(tmp).length));
            const randselected = tmp.splice(randplaylistonrow, 1)
            //console.log(randselected)
            tmp.splice(0, 0, { artist: randselected[0].artist, next: randselected[0].next, source: randselected[0].source })
            //console.log(tmp)
            this.setState({ rowData: tmp })
            this.gridApi.setRowData(this.state.rowData)
            this.setState({ url: this.state.rowData[0].source, playingTitle: this.state.rowData[0].next })
          }
          else
            this.setState({ url: this.state.rowData[0].source, playingTitle: this.state.rowData[0].next })
        else if (this.state.random) {
          const randplaylist = Math.floor(Math.random() * (playlist.length));
          tmp.push({ artist: playlist[randplaylist].artist, next: playlist[randplaylist].label, source: playlist[randplaylist].url })
          //random draw and play
          /*const randplaylist = Math.floor(Math.random() * (Object.keys(playlist).length));
          const randsong = Math.floor(Math.random() * (playlist[randplaylist].options.length));
          tmp.push({ artist: playlist[randplaylist].options[randsong].artist, next: playlist[randplaylist].options[randsong].label, source: playlist[randplaylist].options[randsong].url })
          */
          this.setState({ rowData: tmp })
          this.gridApi.setRowData(this.state.rowData)
          this.setState({ url: this.state.rowData[0].source, playingTitle: this.state.rowData[0].next })
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
      if (index.label === value.label)
        tmpData.push({ artist: index.artist, next: index.label, source: index.url })
    })
    this.setState({ rowData: tmpData })
    this.gridApi.setRowData(this.state.rowData);
  }

  handleRandom = () => {
    console.log(playlist)
    this.setState({ random: !this.state.random })
    if (!this.state.random) {
      const tmp = this.state.rowData
      console.log("run random")
      console.log(this.state.playing)
      if (!this.state.playing || (tmp === undefined || tmp.length == 0)) {
        const randplaylist = Math.floor(Math.random() * (playlist.length));
        tmp.push({ artist: playlist[randplaylist].artist, next: playlist[randplaylist].label, source: playlist[randplaylist].url })
        /*
        //random draw and play
        const randplaylist = Math.floor(Math.random() * (Object.keys(playlist).length));
        const randsong = Math.floor(Math.random() * (playlist[randplaylist].options.length));
        //update grid and load
        tmp.push({ artist: playlist[randplaylist].options[randsong].artist, next: playlist[randplaylist].options[randsong].label, source: playlist[randplaylist].options[randsong].url })
        */
        this.setState({ rowData: tmp })
        this.gridApi.setRowData(this.state.rowData)
        this.setState({ url: this.state.rowData[0].source, playingTitle: this.state.rowData[0].next })
      }
    }
  }

  handleCustomAdd(evt, data) {
    const tmp = this.state.rowData
    data.map((index, key) => {
      tmp.push({ artist: index.artist, next: index.label, source: index.url })
    })
    this.setState({ rowData: tmp })
    this.gridApi.setRowData(this.state.rowData)
    localStorage.setItem('user', "success added before")
    this.handleToggleModal()
  }

  handleCustomRand(evt, data) {
    //console.log(data)
    let tmp = []
    data.map((index, key) => {
      tmp.push({ label: index.label, artist: index.artist, album: index.album, url: index.url })
    })
    playlist = tmp
    // store user details 
    localStorage.setItem('playlist', JSON.stringify(playlist))
    this.handleToggleModal()
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
  }

  /*handleTogglePIP = () => {
        this.setState({ pip: !this.state.pip })
      }*/

  /*handleEnablePIP = () => {
    console.log('onEnablePIP')
    this.setState({ pip: true })
  }
  
  handleDisablePIP = () => {
    console.log('onDisablePIP')
    this.setState({ pip: false })
  }*/

  /*renderLoadButton = (url, label) => {
    return (
      <Button outline onClick={() => this.load(url)}>
        {label}
      </Button>
    )
  }*/
  setActiveTab(tab) {
    this.setState({ activeTab: tab })
    switch (tab) {
      case '1':
        if (JSON.parse(localStorage.getItem('user')) === null)
        swal("Adding to List", "Choose songs by checkboxes and add to playlist.");
        break;
      case '2':
        if (JSON.parse(localStorage.getItem('databaseplaylist')) === null)
        swal("Adding to Database", "Input song information and add to database.");
        break;
      case '3':
        if (JSON.parse(localStorage.getItem('playlist')) === null)
        swal("Customize Random", "Choose songs for random, system will store your choices and random your choices only.");
        break;
    }
  }

  ref = player => {
    this.player = player
  }

  handleAddAlbumSelect(e) {
    this.setState({ AblumSelect: e.target.value })
  }

  handleAddArtistSelect(e) {
    this.setState({ ArtistSelect: e.target.value })
  }

  handleAddName(e) {
    this.setState({ AddName: e.target.value })
  }

  handleAddSource(e) {
    this.setState({ AddSource: e.target.value })
  }

  handleAddDatabase = () => {
    let newsong = {
      label: this.state.AddName,
      artist: this.state.ArtistSelect,
      album: this.state.AblumSelect,
      url: this.state.AddSource,
    }
    playlist.push(newsong)
    console.log(playlist)
    /*testplaylist.push(newsong)
    console.log(typeof testplaylist)
    var writeJson = require('write-json'); 
    writeJson.sync('testplaylist.json', {abc: 'xyz'});*/
    databaseplaylist.push(newsong)
    localStorage.setItem('databaseplaylist', JSON.stringify(databaseplaylist))
    swal("Added", "Successfully added to list", "success")
    this.handleToggleModal()
  }

  render() {
    const classes = useStyles;
    const { url, playing, controls, light, volume, muted, loop, hide, played, loaded, duration, playbackRate, pip, title, dark, random, activeTab, ArtistSelect, AblumSelect } = this.state
    /*if (url !== null && playing) {
      axios.get('https://noembed.com/embed?url=' + url)
        .then(response => this.setState({ title: response.data.title }))
    }*/
    const TFoptions = []
    TFoptions.push({ label: 'true', value: true }, { label: 'false', value: false })
    let cusComponents = {};
    const MenuList = props => {
      return (
        <components.MenuList {...props}>
          {props.children}
          <a href="#"
            style={menuHeaderStyle}
            onClick={(e) => { this.handleToggleModal(); e.preventDefault(); e.stopPropagation(); }}>
            <AddCircleOutlineIcon />Custom Add</a>
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
          </div>
          <br />
          <Row>
            <Col align="center">
              <Button onClick={this.handleBack} color="primary"><SkipPreviousIcon /></Button>
              <Button onClick={this.handlePlayPause} color="warning">{playing ? <PauseIcon /> : <PlayArrowIcon />}</Button>
              <Button onClick={this.handleNext} color="primary"><SkipNextIcon /></Button>
              <Button onClick={this.handleStop} color="danger"><StopIcon /></Button>
              {/*<Button onClick={this.handleSetPlaybackRate} color="primary"
                value={(this.state.playbackRate === 2) ? 1 : ((this.state.playbackRate === 1) ? 1.5 : 2)}
              >
                <FastForwardIcon />
      </Button>*/}
              <Button id="random" onClick={this.handleRandom}>{random ? <ShuffleIcon /> : <SyncAltIcon />}</Button>
              <UncontrolledTooltip placement="bottom" target="random">
                {random ? "Turn off random play" : "Random play song in playlist (if playlist null, randomly add)"}
              </UncontrolledTooltip>
              {/* <Button onClick={this.handleToggleMuted}>{muted ? <VolumeOffIcon /> : <VolumeUpIcon />}</Button>*/}
              <Button id="loop" onClick={this.handleToggleLoop}>{loop ? <SyncDisabledIcon /> : <SyncIcon />}</Button>
              <UncontrolledTooltip placement="bottom" target="loop">
                {loop ? "Stop looping" : "Loop current song"}
              </UncontrolledTooltip>
              <Button id="hide" onClick={this.handleToggleHide}>{hide ? <DesktopAccessDisabledIcon /> : <DesktopWindowsIcon />}</Button>
              <UncontrolledTooltip placement="bottom" target="hide">
                {hide ? "Show the player screen" : "Hide above player screen"}
              </UncontrolledTooltip>
              <Button id="dark" onClick={this.handleDarkMode} >{dark ? <FeaturedPlayListIcon /> : <PictureInPictureAltIcon />}</Button>
              <UncontrolledTooltip placement="bottom" target="dark">
                {dark ? "Default background" : "Dark mode"}
              </UncontrolledTooltip>
              {//ReactPlayer.canEnablePIP(url) &&
                //<Button onClick={this.handleTogglePIP}>{pip ? 'Disable PiP' : 'Enable PiP'}</Button>
              }
            </Col>
          </Row>
          <br />
          <Table id="table" borderless>
            <thread>
              <tr>
                <th>Playing</th>
                <td><Label>{this.state.playingTitle}</Label></td>
              </tr>
              <tr>
                <th>Volume</th>
                <td>
                  {/*<CustomInput type="range" min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} />*/}
                  <Grid container spacing={2}>
                    <Grid item>
                      <IconButton id="volume" className={useStyles.margin} size="small"
                        onClick={() => this.handleToggleMuted()}>
                        {dark ?
                          muted ? <MuiThemeProvider theme={theme}> <VolumeOffIcon style={theme.palette.white} /></MuiThemeProvider> :
                            <MuiThemeProvider theme={theme}><VolumeDown style={theme.palette.white} /></MuiThemeProvider>
                          :
                          muted ? <MuiThemeProvider theme={theme}> <VolumeOffIcon style={theme.palette.black} /></MuiThemeProvider> :
                            <MuiThemeProvider theme={theme}><VolumeDown style={theme.palette.black} /></MuiThemeProvider>
                        }</IconButton>
                      <UncontrolledTooltip placement="bottom" target="volume">
                        {muted ? "Unmute" : "Mute"}
                      </UncontrolledTooltip>
                    </Grid>
                    <Grid item xs>
                      <Slider value={volume * 100} onChange={this.handleVolumeChange} />
                    </Grid>
                    <Grid item>
                      <VolumeUpIcon />
                    </Grid>
                  </Grid>
                </td>
              </tr>
              <tr>
                <th>Time</th>
                <td><Progress color="warning" max={1} value={played} /></td>
              </tr>
              <Collapse isOpen={this.state.collapse}>
                {/*<tr>
                  <th>Jump</th>
                  <td>
                    <CustomInput type="range" min={0} max={1} step='any'
                      value={played}
                      onMouseDown={this.handleSeekMouseDown}
                      onChange={this.handleSeekChange}
                      onMouseUp={this.handleSeekMouseUp}
                    />
                  </td>
                </tr>*/}
                <tr >

                  <th >
                    <div
                      id="playlistGrid"
                      className="ag-theme-balham"
                      style={{
                        height: "100%",
                        width: '100%'
                      }}
                    >
                      <Select
                        placeholder="Find videos and add to list"
                        className="darkselect"
                        {...cusComponents}
                        options={database}
                        onChange={(e) => this.handleUpdatePlaylist(e)}
                      >
                      </Select>
                      <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        domLayout="autoHeight"
                        onGridReady={this.onGridReady}
                        rowSelection={this.state.rowSelection}
                        frameworkComponents={this.state.frameworkComponents}
                        gridOptions={{
                          context: { componentParent: this }
                        }}
                      >
                      </AgGridReact>
                    </div>
                  </th>
                </tr>
                {/*
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
        </section>
        <div >
          <Modal isOpen={this.state.showModal} toggle={this.handleToggleModal} >
            <ModalHeader toggle={this.handleToggleModal}>Playlist Menu</ModalHeader>
            <ModalBody>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => { this.setActiveTab('1'); }}
                  >
                    Adding to List
          </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => { this.setActiveTab('2'); }}
                  >
                    Adding to database
          </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '3' })}
                    onClick={() => { this.setActiveTab('3'); }}
                  >
                    Customize Random
          </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <MaterialTable
                    title="Song database"
                    data={databaseplaylist}
                    icons={tableIcons}
                    columns={[
                      { title: "Title", field: "label", cellStyle: { color: '#000000' }, headerStyle: { color: '#000000' } },
                      { title: "Artist", field: "artist", cellStyle: { color: '#000000' }, headerStyle: { color: '#000000' } },
                      { title: "Single/Album", field: "album", cellStyle: { color: '#000000' }, headerStyle: { color: '#000000' } },
                      { title: "Source", field: "url", cellStyle: { color: '#000000' }, headerStyle: { color: '#000000' } },
                    ]}
                    //parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
                    options={{
                      selection: true,
                      grouping: true,
                      sorting: true,
                      search: true,
                      filtering: true,
                      pageSize: 10
                    }}
                    actions={[
                      {
                        tooltip: 'Add to List',
                        icon: tableIcons.Add,
                        onClick: (evt, data) => {
                          this.handleCustomAdd(evt, data)
                        }
                      }
                    ]}
                  />
                </TabPane>
                <TabPane tabId="2">
                  <Table>
                    <tr>
                      <th>
                        <Label className="darkselect">Name</Label>
                      </th>
                      <td>
                        <Input className="darkselect" type="text" onChange={(e) => this.handleAddName(e)}></Input>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <Label className="darkselect">Artist</Label>
                      </th>
                      <td>
                        <Input type="text" list="artistlist" onChange={(e) => this.handleAddArtistSelect(e)} />
                        <datalist id="artistlist" >
                          {artistlist.map((item, key) =>
                            <option key={item.label} value={item.value} />
                          )}
                        </datalist>
                        {/*<Select
                          className="darkselect"
                    isSearchable
                    selected={ArtistSelect}
                          onChange={(e) => this.handleAddArtistSelect(e)}
                    options={artistlist}
                        ></Select>*/}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <Label className="darkselect">Album</Label>
                      </th>
                      <td>
                        <Input type="text" list="albumlist" onChange={(e) => this.handleAddAlbumSelect(e)} />
                        <datalist id="albumlist" >
                          {albumlist.map((item, key) =>
                            <option key={item.label} value={item.value} />
                          )}
                        </datalist>
                        {/*<Select
                          className="darkselect"
                    isSearchable
                    selected={AblumSelect}
                          onChange={(e) => this.handleAddAlbumSelect(e)}
                    options={albumlist}
                        ></Select>*/}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <Label className="darkselect">Source</Label>
                      </th>
                      <td>
                        <Input className="darkselect" type="text" onChange={(e) => this.handleAddSource(e)}></Input>
                      </td>
                    </tr>
                    <tr>
                      <Button outline color="success"
                        onClick={this.handleAddDatabase}>
                        Add
                    </Button>
                    </tr>
                  </Table>
                </TabPane>
                <TabPane tabId="3">
                  <MaterialTable
                    title="Song database"
                    data={databaseplaylist}
                    icons={tableIcons}
                    columns={[
                      { title: "Title", field: "label", cellStyle: { color: '#000000' }, headerStyle: { color: '#000000' } },
                      { title: "Artist", field: "artist", cellStyle: { color: '#000000' }, headerStyle: { color: '#000000' } },
                      { title: "Single/Album", field: "album", cellStyle: { color: '#000000' }, headerStyle: { color: '#000000' } },
                      { title: "Source", field: "url", cellStyle: { color: '#000000' }, headerStyle: { color: '#000000' } },
                    ]}
                    //parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
                    options={{
                      selection: true,
                      grouping: true,
                      sorting: true,
                      search: true,
                      filtering: true,
                      pageSize: 10,
                    }}
                    actions={[
                      {
                        tooltip: 'Add to List',
                        icon: tableIcons.Add,
                        onClick: (evt, data) => {
                          this.handleCustomRand(evt, data)
                        }
                      }
                    ]}
                  />
                </TabPane>
              </TabContent>
            </ModalBody>
          </Modal>
        </div>
      </div >
    );
  }
}
//export {testplaylist}
export default App