
import MainPage from './components/MainPage.js';
import ProjectPage from './components/ProjectPage.js';
import Navbar from './components/Navbar.js';

Promise.all([
      d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vQHUAOoNs2lelD7vBww6KByRtGzPO0ioOF64BAsutJdCSInGpHD-162tliNdwiALGaqOova71ydqo9z/pub?output=csv"),
      d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vT76E1FxnUSlojNcohiy-B8IqxUWZewxenBJ1mrtvUoT2gqWg5JgoDNnm8_j53FCSVgNNrxlqNvxabv/pub?output=csv"),
      d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vSf5fg69bMqUM6_EMEWPdnrzU_gUanyiw7Ez1kMpBUKMJskI7hn0Uw4JKH6Yg77pgwxgeSf501s0FWv/pub?output=csv"),
      ])
      .then(([about, themes, projects]) => {
        const data = {about, themes, projects};
        console.log(data);

    // determine what page to render
    let params = new URLSearchParams(window.location.search);
    if (params.get('project')==null){
        MainPage(data);
    }else{
        let project = data.projects.find(d=>d.title===params.get('project'));
        Navbar('project')
        ProjectPage(project, data.projects);
        lightGallery(document.getElementById('lightgallery'), {
            plugins: [lgZoom, lgThumbnail, lgVideo],
            speed: 500,
            thumbnail: true
        });
        
        // apply HighlightJS
        // hljs.highlightAll();
        setTimeout(function () {
            var pres = document.querySelectorAll("pre>code");
            for (var i = 0; i < pres.length; i++) {
                hljs.highlightBlock(pres[i]);
            }
            var options = {
                contentSelector: ".container",
                // Delay in ms used for `setTimeout` before badging is applied
                // Use if you need to time highlighting and badge application
                // since the badges need to be applied afterwards.
                // 0 - direct execution (ie. you handle timing
                loadDelay:0,
    
                // CSS class(es) used to render the copy icon.
                copyIconClass: "fa fa-copy",
                // CSS class(es) used to render the done icon.
                checkIconClass: "fa fa-check text-success",
              
                // hook to allow modifying the text before it's pasted
                onBeforeTextCopied: function(text, codeElement) {
                  return text;   //  you can fix up the text here
                }
            };
            window.highlightJsBadge(options);
        },10);
    } 
});
