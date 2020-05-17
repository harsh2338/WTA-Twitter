import { Component, OnInit } from '@angular/core';
import { TweetService } from '../../../services/tweet.service'
import { Chart } from 'node_modules/chart.js'
import { from, bindCallback } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  JsonSentiment=[{'score':{'score':1,'comparative':2},'full_text':"fsege"}];
   chartArea
   TableArea
  constructor(private tweetService: TweetService) { }

  ngOnInit() {

    this.chartArea=document.getElementById('chart-section')
    this.TableArea=document.getElementById('table-section')

    this.chartArea.style.display='none'
    this.TableArea.style.display='none'
  }
  searchText(searchValue){
    var sv=searchValue.value;
    this.getSentimentAnalysis(sv)

  }


  async getSentimentAnalysis(sv) {
    console.log(sv);
    var jsonResponse=await this.tweetService.getSentimentData(sv);
    // this.JsonSentiment = Array.of(jsonResponse);
    this.JsonSentiment=jsonResponse
    console.log(this.JsonSentiment);
    var negScore=0,nneg=0;
    var posScore=0,npos=0;
    var nuetralScore=0;
    for(var i=0;i<this.JsonSentiment.length;i++){
        var data=this.JsonSentiment[i];
        if(data.score.score<0){
          negScore+=(data.score.score)*-1;
          nneg++;
          console.log(data.score.score)
        }
        else if(data.score.score>0){
          posScore+=(data.score.score);
          npos++;
          console.log(data.score.score)
        }
        else nuetralScore++;
    }
    this.setBarChart([nneg,nuetralScore,npos]);
    this.setPieChart([negScore,nuetralScore,posScore]);

    this.chartArea.style.display='block'
    this.TableArea.style.display='block'

    this.scrollToElement('chart-section')

  }
  scrollToElement(id): void {
    console.log("Scrolling")
    var ele=document.getElementById(id);
    ele.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  setPieChart(datavalues){
    var pie = new Chart("sentimentChart", {
      type: 'pie',
      data: {
        labels: ['Negative', 'Neutral',  'Positive'],
        datasets: [{
          label: '', 
          data: datavalues,
          backgroundColor: [
            '#FF4949',
            '#80A3D5',
            '#80DA80',
          ],
          borderColor: [
            'red',
            'blue',
            'green',
          ],
          borderWidth: 3
        }]
      },
      options: {

      }
    });
  }
  setBarChart(datavalues){
    var bar = new Chart("noChart", {
      type: 'bar',
      data: {
        labels: ['Negative', 'Neutral',  'Positive'],
        datasets: [{
          label: 'Number of tweets',
          barThickness: 30, 
          data: datavalues,
          backgroundColor: [
            '#FF4949',
            '#80A3D5',
            '#80DA80',
          ],
          borderColor: [
            'red',
            'blue',
            'green',
          ],
          borderWidth: 3
        }]
      },
      options: {
      }
    });
  }
  }
