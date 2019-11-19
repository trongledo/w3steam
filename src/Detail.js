import React from 'react';
import $ from 'jquery';
import jQuery from 'jquery';

import './css/Detail.css';
var isFirstSlide = true;
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgRoot: { bran: 'no' },
      indexBackground: 0
    };

    this.hideElement = this.hideElement.bind(this);

    this.initNewPreview = this.initNewPreview.bind(this);
    this.closeDetail = this.closeDetail.bind(this);
    this.showDetail = this.showDetail.bind(this);
    this.onShowDone = this.onShowDone.bind(this);
    this.closeDone = this.closeDone.bind(this);
    this.imgCloseDown = this.imgCloseDown.bind(this);
    this.onNextSlide = this.onNextSlide.bind(this);
    this.onPreSlide = this.onPreSlide.bind(this);
    this.checkSlide = this.checkSlide.bind(this);
  }

  componentDidMount() {
    window.controllDetailPage();
    this.initNewPreview();
  }

  checkScrollBar() {
    (function($) {
      $.fn.hasScrollBar = function(value) {
        let x = value ? value : 0;
        console.log(this.get(0).scrollHeight - x, this.height());
        return this.get(0).scrollHeight - x > this.height();
      };
    })(jQuery);

    if (
      ($('.description').get(0) && $('.description').hasScrollBar(30)) ||
      ($('.preview').get(0) && $('.preview').hasScrollBar(0))
    ) {
      $('.btn-close').css('right', '37px');
      console.log(true);
    } else {
      $('.btn-close').css('right', '20px');
      console.log(false);
    }
  }

  hideElement(isHide) {
    let opacity = isHide ? 0 : 1;

    $('.img-view > button').css('opacity', opacity);
    $('.btn-close').css('opacity', opacity);
    //$(".description").css("opacity", opacity);
    //$(".img-view").css("background-color", isHide? "transparent" : "#1b1b1c");

    // $(".overlay").css("opacity", 0);
    //$(".description").css("display", "none");
    // $(".img-view i").css("display", "none");
    //$(".img-view").css("background-color", "transparent");
  }

  switchImg(isShowTemp) {
    $('#img-temp').css('display', isShowTemp ? 'block' : 'none');
    $('#img-item-0').css('opacity', isShowTemp ? 0 : 1);
  }

  initNewPreview() {
    this.hideElement(true);
    let that = this;
    isFirstSlide = true;
    $('#img-item-0').attr('src', this.props.content.listBackgroundUrl[0]);
    this.state.indexBackground = 0;
    $('.img-original').css('opacity', 0);
    $('#img-item-0').css('opacity', 1);

    $('#img-item-0')
      .on('load', function() {
        $('.preview').css('opacity', 1);
        that.showDetail();
      })
      .on('error', function() {
        console.log('error loading image');
      });
  }

  showDetail() {
    //$(".description").css("display", "flex");
    //$(".overlay").css("opacity", 1);

    this.switchImg(true);

    this.state.imgRoot = $('#img-project-' + this.props.content.id);
    this.state.imgDetail = $('#img-item-0');

    this.state.imgRoot.removeClass('bgd-fixed');

    let that = this;

    //  init img-temp
    $('#img-temp').css({
      top: that.state.imgRoot.offset().top - $(window).scrollTop(),
      left: that.state.imgRoot.offset().left - $(window).scrollLeft(),
      height: that.state.imgRoot.outerHeight(),
      width: that.state.imgRoot.outerWidth()
    });
    $('#img-temp').attr('src', that.props.content.backgroundUrl);

    $('body').addClass('hide-scroll');
    console.log(
      'root',
      this.state.imgRoot.outerHeight(),
      this.state.imgRoot.outerWidth()
    );
    this.state.imgRoot.css('opacity', 0);

    this.imgShowUp();

    $('.bgd-fixed').addClass('item-fade-out-center');
    //this.state.imgRoot.removeClass("item-fade-out-center");

    setTimeout(this.onShowDone, 350);
  }

  imgShowUp() {
    console.log(
      'target',
      $('#img-item-0').outerHeight(),
      $('#img-item-0').outerWidth()
    );
    var imgTarget = $('#img-item-0');
    $('#img-temp').animate(
      {
        height: imgTarget.outerHeight(),
        width: imgTarget.outerWidth(),
        top: imgTarget.offset().top - $(window).scrollTop(),
        left: imgTarget.offset().left - $(window).scrollLeft()
      },
      {
        duration: 350,
        easing: 'linear'
      }
    );
  }

  onShowDone() {
    this.hideElement(false);

    this.checkSlide();
    this.switchImg(false);
    this.checkScrollBar();
  }

  closeDetail() {
    this.hideElement(true);
    $('.bgd-fixed').removeClass('item-fade-out-center');

    this.switchImg(true);

    $('.img-original').removeClass('img-slide');
    $('.img-original').css('opacity', 0);

    $('#img-temp').css({
      top: this.state.imgDetail.offset().top - $(window).scrollTop(),
      left: this.state.imgDetail.offset().left - $(window).scrollLeft(),
      height: this.state.imgDetail.outerHeight(),
      width: this.state.imgDetail.outerWidth()
    });

    $('.description').css('opacity', 0);
    $('.img-view').css('background-color', 'transparent');
    $('.preview-inner').css('background-color', 'transparent');

    this.imgCloseDown();

    $('.bgd-fixed').addClass('item-fade-in-center');
    //this.state.imgRoot.removeClass("item-fade-in-center");

    setTimeout(this.closeDone, 350);
  }

  imgCloseDown() {
    var imgTarget = $('#img-project-' + this.props.content.id);
    console.log(imgTarget);
    $('#img-temp').animate(
      {
        height: imgTarget.outerHeight(),
        width: imgTarget.outerWidth(),
        top: imgTarget.offset().top - $(window).scrollTop(),
        left: imgTarget.offset().left - $(window).scrollLeft()
      },
      {
        duration: 350,
        easing: 'linear'
      }
    );
  }

  closeDone() {
    // $(".preview").css("display", "none");
    $('#img-temp').css('opacity', 0);
    this.state.imgRoot.css('opacity', 1);
    this.state.imgRoot.addClass('bgd-fixed');
    this.props.closeDetail();
  }

  checkSlide() {
    var src = $('#img-item-0').attr('src');
    //console.log(this.props.content.listBackgroundUrl.indexOf(src));

    if (this.state.indexBackground == 0) {
      $('#btn-pre').css('display', 'none');
    } else {
      $('#btn-pre').css('display', 'inherit');
    }

    if (
      this.state.indexBackground ==
      this.props.content.listBackgroundUrl.length - 1
    ) {
      $('#btn-next').css('display', 'none');
    } else {
      $('#btn-next').css('display', 'inherit');
    }
    $('#item-placeholder').attr(
      'src',
      this.props.content.listBackgroundUrl[this.state.indexBackground]
    );
  }

  onNextSlide() {
    if (isFirstSlide) {
      $('.img-original').addClass('img-slide');
      isFirstSlide = false;
    }

    this.state.indexBackground++;
    $('.img-original').css('opacity', 0);
    $('#img-item-' + this.state.indexBackground).css('opacity', 1);
    this.checkSlide();
  }

  onPreSlide() {
    this.state.indexBackground--;
    $('.img-original').css('opacity', 0);
    $('#img-item-' + this.state.indexBackground).css('opacity', 1);
    this.checkSlide();
  }

  render() {
    return (
      <div className="preview">
        <div className="preview-inner">
          <div className="row">
            <div className="img-view col-sm-6">
              <button
                id="btn-pre"
                className="material-icons"
                onClick={this.onPreSlide}
              >
                chevron_left
              </button>
              <button
                id="btn-next"
                className="material-icons"
                onClick={this.onNextSlide}
              >
                chevron_right
              </button>
              <div className="list-view">
                <div className="item-placeholder">
                  <img
                    id="item-placeholder"
                    className="img-item"
                    src={this.props.content.backgroundUrl}
                  />
                </div>

                {this.props.content.listBackgroundUrl.map((item, index) => (
                  <div className="view-item" key={index}>
                    <img
                      id={`img-item-${index}`}
                      className="img-item img-original"
                      src={item}
                      alt=""
                    />
                  </div>
                ))}

                <img id="img-temp" alt="" />
              </div>
            </div>

            <div className="description col-sm-6">
              <div className="description-inner">
                <h3 style={{ marginTop: 0 }}>
                  {this.props.content.projectName}
                </h3>
                <span
                  dangerouslySetInnerHTML={{
                    __html: this.props.content.projectDescription
                  }}
                  className="description-text"
                ></span>
                {this.props.content.author ? (
                  <span className="">— {this.props.content.author}</span>
                ) : (
                  ''
                )}

                <div className="details">
                  <a target="_blank" href={this.props.content.projectLink}>
                    {this.props.content.projectLink}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="btn-close" onClick={this.closeDetail}>
          <span className="glyphicon glyphicon-remove-circle"></span>
          <div>Close</div>
        </button>
      </div>
    );
  }
}

export default Detail;

{
  /* <div className="list-view">
                                <div className="item-placeholder">
                                    <img  className="img-item" src={this.props.content.backgroundUrl}/>
                                </div> 
                                <div className="view-item">
                                    <img  className="img-item" src={this.props.content.backgroundUrl}/>
                                </div> 

                                <div className="view-item">
                                    <img  className="img-item" src={this.props.content.backgroundUrl}/>
                                </div> 
                            </div> */
}
