const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')
const time_songs = $('.time-music-end');
const step_song = $('.time-music-start');
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [{

            name: 'con mua ngang qua',
            singer: 'MTP',
            path: './assets/music/Chay-Ngay-Di-Son-Tung-M-TP.mp3',
            img: './assets/img/img-sep.jpg'
        },
        {

            name: 'mat moc',
            singer: 'Vanh',
            path: './assets/music/MatMoc-PhamNguyenNgocVAnhAnNhi-7793420.mp3',
            img: './assets/img/wife2.jpg'
        },
        {
            name: 'yeu 5',
            singer: 'rymh',
            path: '',
            img: './assets/img/339226487_662665192331377_827429169799646964_n.jpg'
        },
        {
            name: 'so ngay mai em di mat',
            singer: 'quang dang',
            path: '',
            img: './assets/img/quangdang.jpg'
        },
        {
            name: 'buon cua anh',
            singer: 'datG',
            path: '',
            img: './assets/img/datg.jpg'
        },
        {

            name: 'con mua ngang qua',
            singer: 'MTP',
            path: './assets/music/Chay-Ngay-Di-Son-Tung-M-TP.mp3',
            img: './assets/img/img-sep.jpg'
        },
        {

            name: 'mat moc',
            singer: 'Vanh',
            path: './assets/music/MatMoc-PhamNguyenNgocVAnhAnNhi-7793420.mp3',
            img: './assets/img/wife2.jpg'
        },
        {
            name: 'yeu 5',
            singer: 'rymh',
            path: '',
            img: './assets/img/339226487_662665192331377_827429169799646964_n.jpg'
        },
        {
            name: 'so ngay mai em di mat',
            singer: 'quang dang',
            path: '',
            img: './assets/img/quangdang.jpg'
        },
        {
            name: 'buon cua anh',
            singer: 'datG',
            path: '',
            img: './assets/img/datg.jpg'
        },
    ],

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' :''}"data-index = "${index}">
              <div class="thumb" 
                style="background-image: url('${song.img}')">
              </div>
              <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
              </div>
              <div class="option">
                <i class="fas fa-ellipsis-h"></i>
              </div>
            </div>
          `
        })
        playlist.innerHTML = htmls.join('');

    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this
            // xu li quay / 
        const cdThumbAnimate = cdThumb.animate([{
                transform: 'rotate(0)'
            },
            {
                transform: 'rotate(359deg)'
            }
        ], {
            duration: 10000,
            iterations: Infinity
        });
        cdThumbAnimate.pause()
            // xu li cuon
        const cdWidth = cd.offsetWidth
        document.onscroll = function() {
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                const newCdWidth = cdWidth - scrollTop
                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            }
            // xu li khi click play
        playBtn.onclick = function() {

            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }

        }

        // khi song duoc play
        audio.onplay = function() {
                _this.isPlaying = true
                player.classList.add('playing')
                cdThumbAnimate.play()
            }
            // khi song duoc pause
        audio.onpause = function() {
                _this.isPlaying = false
                player.classList.remove('playing')
                cdThumbAnimate.pause()
            }
            // thay doi tien do bai hat
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPersent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPersent
            }
        }

        // xu li khi tua song
        progress.onchange = function(e) {
                const seekTime = audio.duration / 100 * e.target.value
                audio.currentTime = seekTime
            }
            // khi next
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()

            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }
        audio.onended = function() {
                if (_this.isRepeat) {
                    audio.play()
                } else {
                    nextBtn.click()
                }
            }
            // xu li phat lai 1 bai hat
        repeatBtn.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active')
            if (songNode || e.target.closest('.option')) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
            }
        }

    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            })
        }, 300)
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`
        audio.src = this.currentSong.path
    },
    nextSong: function() {
        this.currentIndex++

            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0
            }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1
            }
        this.loadCurrentSong()
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }
        while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function() {
        // định nghĩa các  thuộc tính cho object 
        this.defineProperties()
            // lắng nghe các sự kiện
        this.handleEvents()
            // render các list
        this.render()
            // tải thông tin bài hát đầu tiên khi chạy 
        this.loadCurrentSong()
    }
}
app.start()