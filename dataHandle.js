let reviewData = [];
let metadata = [];
let data = [];
let chartData = [];

function getMetadata(){
    d3.json("data.json").then(function(data){
       metadata = data;
        getReviewData();
    });
}

function getReviewData(){
    d3.json("review_sentiment_Data.json").then(function(review_data){
        reviewData = review_data;
        initData();
    });
}

function initData(){
    metadata.forEach(function(metadataElement){
        metadata_asin = metadataElement['asin'];
        average_sentiment_score = 0.0;
        average_rating = 0;
        count = 0;
        reviewData.forEach(function(reviewElement){
           if(metadata_asin == reviewElement['asin']){
                average_sentiment_score += reviewElement['sentimentValue'];
                average_rating += reviewElement['overall'];
                count += 1;
           }
        });
        if(count > 0){
            metadataElement['sentimentValue'] = average_sentiment_score/count;
            metadataElement['rating'] = average_rating/count;
            if(metadataElement['sentimentValue'] < 3){
                metadataElement['sentiment'] = 'Negative';
            }else if(metadataElement['sentimentValue'] > 3){
                metadataElement['sentiment'] = 'Positive';
            }else{
                metadataElement['sentiment'] = 'Neutral';
            }
            data.push(metadataElement);
        }
    });
}

function processChartData(filter) {
    if(filter == null){
        data.forEach(function(dataElement){
            temp_object = {};
            for(var prop in dataElement){
                if(dataElement.hasOwnProperty(prop)){
                    if(prop == 'sentimentValue'){
                        temp_object['x'] = dataElement[prop];
                        temp_object['sentimentValue'] = dataElement[prop].toPrecision(2);
                    }else if(prop == 'rating'){
                        temp_object['y'] = dataElement[prop];
                        temp_object['rating'] = dataElement[prop].toPrecision(2);
                    }else{
                        temp_object[prop] = dataElement[prop];
                    }
                }
            }
            chartData.push(temp_object);
        });
    }else{
        // process for each key in the filter object
    }
    return chartData;
}

