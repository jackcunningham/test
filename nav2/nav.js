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
		<li class="li-menu" v-bind:class="{ liMenuOpen: isOpen }">
			
			<a href="" @click="toggleCategory($event)">
				{{ heading }}
			
				<svg width="24" height="24" class="navigation-toggle svgicon svgicon--b">
					<use xlink:href="#chevron" />
				</svg>
			
			</a>
			<ul>
				<li @click="toggleCategory($event)" class="navigation-back">
					<svg width="24" height="24" class="navigation-toggle navigation-back svgicon svgicon--b">
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
		toggleCategory: function(event) {

			event.preventDefault();
			event.target.closest('ul').classList.add('isParked');

			// when there is a scroll position, set an offset for the sub menu

			this.isOpen = !this.isOpen

		}
	}
}); 

Vue.component('navigation', {
	template: `
		<div>
			<svg width="32" height="32" class="svgicon navigation-open" @click="openNavigation()">
				<use xlink:href="#burger" />
			</svg>

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
	mounted() {

		var subMenus = document.querySelectorAll('.navigation .li-menu');

		for (i = 0; i < subMenus.length; ++i) {
			
			var parentLink = subMenus[i].querySelector('a');
			var homeLink = parentLink.cloneNode(true);
			homeLink.innerText = 'All ' + homeLink.innerText.trim();
			var firstItem = subMenus[i].querySelector('ul li');

			var homeLinkLi = document.createElement('li');
			homeLinkLi.prepend(homeLink);
			homeLinkLi.classList.add('navigation-subhead');

			firstItem.after(homeLinkLi);

			

		}

	}
});


