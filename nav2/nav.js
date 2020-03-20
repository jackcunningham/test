Vue.component('li-item', {
	props: ['highlight'],
	template: '<li :class="highlight"><slot></slot></li>',
	data() {
		return {}
	}
}); 


Vue.component('li-menu', {
	props : ['heading'],
	template: `
		<li class="li-menu" v-bind:class="{ liMenuOpen: isOpen }">
			<b @click="toggleCategory()">
				<svg width="28" height="28" class="svgicon svgicon--b">
					<use xlink:href="#chevron" />
				</svg>
			</b>
			{{ heading }}
			<ul>
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
  	toggleCategory: function() {
  	  this.isOpen = !this.isOpen
  	}
  },
}); 

Vue.component('navigation', {
	template: `
		<div>
			<svg width="32" height="32" class="svgicon navigation-open" @click="openNavigation()">
				<use xlink:href="#burger" />
			</svg>

			<div class="navigation" v-bind:class="{ navigationOpen: isOpen }">
			
				<svg width="32" height="32" class="svgicon navigation-close" @click="closeNavigation()">
					<use xlink:href="#close" />
				</svg>

				<slot></slot>
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
	el: '#root'
})