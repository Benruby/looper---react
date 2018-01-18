Tracks Looper Developed in React.

<h3>Dependencies:</h3>
<ul>
  <li>Node > 7.6</li>
  <li>npm > 4.1.2</li>
</ul>

<h3>Install:</h3>
<ul>
  <li>Clone the repo.</li>
  <li><code>cd</code> into the newly created folder. </li>
  <li>run <code>npm install</code></li>
  <li>run <code>npm start</code></li>
</ul>

<h3>Functionality:</h3>
<h4>Top Panel (3 buttons):</h4>
<ol>
  <li>Sync
    <ul>
      <li>
      will play all tracks at once.</li>
      <li>
      Will visually sync the tracks bpm to the highest bpm (leader track)</li>
      <li>Will reorder the tracks by duration.</li>
      <li>If clicked again, will pause all tracks but maintain the tracks positions.</li>
      <li>Will set all tracks to loop.</li>
    </ul>
  </li>
  <li>Play
    <ul>
      <li>Will play all tracks at once in first click.</li>
      <li>Will puase all tracks in second and on clicks.</li>
      <li>Will set all tracks to loop.</li>
      <li>Will not change order of tracks.</li>
      <li>will change it's text to pause when clicked tracks are playing.</li>
    </ul>
  </li>
  <li>Stop All
    <ul>
        <li>Will stop all playing tracks.</li>
        <li>Will reset all tracks to start point, including track bar.</li>
        <li>Will remove BPM synced (only visually)</li>
    </ul>
  </li>
</ol>

<h4>Single Track:</h4>
<ol>
    <li>Play Icon - will start and stop individual track playing. Will change to Puase icon when paused.</li>
    <li>Track info
      <ul>
          <li>shows the info of the track.</li>
          <li>the bpm value chages when looper is in sync mode (hit Sync button.)</li>
      </ul>
     </li>
    <li>Bars
      <ul>
          <li>Volume bar - changes the individual track volume.</li>
          <li>Track bar - show track progres. Can change track position by sliding left to right and vice versa.</li>
          <li>Trash Icon - removes a track **BUGGY - needs more work**</li>
      </ul>
    </li>
    <li></li>
</ol>

<h4>Adding items to Looper while in Play All mode or in Sync mode:
</h4>
<p>The functionality was not specified exactly. I didn't took extra steps in that direction. I focused on the functionality of the looper alone, without considering use cases of combining states of inventory actions and looper states and actions.
</p>

<h3>Inventory Section:</h3>
Populate the looper track list with tracks.
When addin a track, it will not automatically run.

<h3>How To Use:</h3>
<ol>
    <li>Add some tracks to the looper from the inventory list.</li>
    <li>Click play, sync etc.</li>
    <li>Pause one track.</li>
    <li>Slide other tracks bar.</li>
    <li>etc.</li>
</ol>

<h3>Missing functionality and bugs:</h3>
<ol>
    <li>SUpport remove of a single track from looper. Needs more work.</li>
    <li>On play all - all tracks sync to the start at the same time. I went with stop button in order to allow continuation of Play all from a paused position.</li>
    <li>When clicking sync, tracks reorder as requested but actual track remain in the same position. Needs more work.</li>
    <li></li>
</ol>