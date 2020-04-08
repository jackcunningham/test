Vue.component('li-item', {
	props: ['highlight', 'summary', 'media', 'cta'],
	template: `
		<li :class="highlight" v-if="media">
			<a href="" class="nav-media-block">
				<div class="nav-media-title"><slot></slot></div>
				<img v-if="media" :src="media" class="nav-media-img" />
				<div v-if="summary" class="nav-media-summary">{{ summary }}</div>
				<div v-if="cta" class="nav-media-cta">{{ cta }}</div>
			</a>
		</li>
		<li :class="highlight" v-else>
			<a href=""><slot></slot></a>
		</li>`,
	data() {
		return {}
	}
}); 


Vue.component('li-menu', {
	props : ['heading'],
	template: `
		<li class="li-menu" 
			v-bind:class="{ liMenuOpen: isOpen }"
			@mouseover="openCategory($event)"
			@mouseout="closeCategory($event)">
			
			<a href="" @click="toggleCategory($event)">
				{{ heading }}
			
				<svg width="24" height="24" class="navigation-toggle svgicon">
					<use xlink:href="#chevron" />
				</svg>
			
			</a>
			<ul>
				<li @click="toggleCategory($event)" class="navigation-back">
					<svg width="24" height="24" class="navigation-toggle navigation-back svgicon">
						<use xlink:href="#chevron" />
					</svg>
					Back
				</li>
				<slot></slot>
			</ul>
		</li>
	`,
	data() {
  		return {
			isOpen: false
		}
	},
	methods: {
		isDesktop: function() {
			if (window.matchMedia('(min-width: 980px)').matches) {
				return true;
			}
		},
		openCategory: function(event) {
			if (this.isDesktop()) {
				this.isOpen = true;
			}
		},
		closeCategory: function(event) {
			if (this.isDesktop()) {
				this.isOpen = false;
			}
		},
		toggleCategory: function(event) {
			if (!this.isDesktop()) {

				console.log('toggling');
				event.preventDefault();
				//event.target.closest('ul').classList.add('isParked');

				// when there is a scroll position, set an offset for the sub menu

				this.isOpen = !this.isOpen
			}

		}
	}
}); 

Vue.component('navigation', {
	template: `
		<div>

			<header class="header">
		
				<ul>
					<li class="header-menu">
						<svg width="32" height="32" class="svgicon navigation-open" @click="openNavigation()">
							<use xlink:href="#burger" />
						</svg>
					</li>
		
					<li class="header-home">
						<a href="/" title="Homepage"><img src="https://assets.feelunique.com/assets/img/feelunique-logo.png" /></a>
					</li>

					<li class="header-search">
						<input type="search" placeholder="Search 35,000+ beauty products, 500+ brands" />
						<a href="/search" title="Search">
							<svg width="28" height="28" class="svgicon">
								<use xlink:href="#search" />
							</svg>
						</a>
					</li>

					<li class="header-account" 
						@mouseover="openNavigation()" 
						@mouseout="closeNavigation()"
						v-bind:class="{ navigationOpen: isOpen }">
						<a href="/myaccount" title="Account">
							<svg width="28" height="28" class="svgicon">
								<use xlink:href="#user" />
							</svg>
							<span class="header-welcome">Hi Jackie</span>
						</a>
					</li>

					<li class="header-bag">
						<a href="/shop/basket" title="Shopping bag">
							<svg width="28" height="28" class="svgicon">
								<use xlink:href="#bag" />
							</svg>
							<span class="count-badge">2</span>
						</a>
					</li>
		
				</ul>
	
			</header>

			<div class="navigation" v-bind:class="{ navigationOpen: isOpen }">

				<div class="navigation-wrapper">
					<slot></slot>
				</div>

				<div class="navigation-matte" @click="closeNavigation()">
					<svg width="56" height="56" class="svgicon navigation-close">
						<use xlink:href="#close" />
					</svg>
				</div>
			</div>

			<div class="confidence-points">
				<a href="" class="confidence-promo">Manesavers, up to 33% off Hair</a>
				<div class="confidence-delivery"><b class="cflag"></b>Free UK delivery over £20</div>
			</div>

		</div>
	`,
	data() {
		return {
			isOpen: false
		}
	},
	methods: {
		openNavigation: function() {
			this.isOpen = true
		},
		closeNavigation: function() {
			this.isOpen = false
		}
	},

});


new Vue({
	el: '#root',
	methods: {
		cloneLinkToParentPageOnSubMenu: function() {
			var subMenus = document.querySelectorAll('.navigation .li-menu');
			for (i = 0; i < subMenus.length; ++i) {
				var supressedHomeLinksList = ['Need help?'];
				var parentLink = subMenus[i].querySelector('a');
				var homeLink = parentLink.cloneNode(true);
				homeLink.innerText = 'All ' + homeLink.innerText.trim();
				var firstItem = subMenus[i].querySelector('ul li');
				var homeLinkLi = document.createElement('li');
				if (!supressedHomeLinksList.includes(parentLink.innerText) ) {
					homeLinkLi.prepend(homeLink);
				} 
				homeLinkLi.classList.add('navigation-subhead');
			
				firstItem.after(homeLinkLi);
			}
		},
		cloneAccountMenuOnDesktop: function() {
			if (window.innerWidth >= 980) {	
				var accountMenu = document.querySelector('li.account-menu > ul');
				var accountIcon = document.querySelector('.header-account');
				accountIcon.appendChild(accountMenu);
			}
		}
	},
	mounted() {
		this.cloneAccountMenuOnDesktop();
		this.cloneLinkToParentPageOnSubMenu();
	}
});


