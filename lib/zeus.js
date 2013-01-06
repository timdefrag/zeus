/*

Symbol Pool:
  α β ψ δ ε φ γ η ι ξ κ λ μ ν ο π ; ρ σ τ θ ω ς ζ υ ζ
  Α Β Ψ Δ Ε Φ Γ Η Ι Ξ Κ Λ Μ Ν Ο Π ; Ρ Σ Τ Θ Ω ς Χ Υ Ζ

Types:
  β  --  'Boolean'            --  for boolean, if, etc
  η  --  'Number'             --  for ints/floats, counts, lengths, anything number-related
  σ  --  'String'             --  for anything string, text-related
  λ  --  'Array'              --  for arrays, lists, iteration, etc
  θ  --  'Object'             --  for objects, maps/sets, etc
  Δ  --  'Function/Do'        --  for function definition, calling, passing, etc
  φ  --  'Null/Undefined'     --  for null, undefined, etc
  
Conventions:
  τ  --  'Type'               --  for types, type-checking, instanceof, etc 
  ρ  --  'Prototype'          --  for object/function prototype related stuff
  ς  --  'Context'            --  for scopes, closures, objects used as containers, etc
  α  --  'Name/Index'         --  for identifiers, indexes, other representors
  γ  --  'Value'              --  for general-purpose known value handling
  ψ  --  'Special'            --  for designating an important difference from typical cases, uniqueness
  μ  --  'Unknown'            --  for working around values of uncertain type/shape/content

Control:
  ξ  --  'Control'            --  for control flow, branching, etc
  Ω  --  'Return/Result'      --  for returning, collecting/reducing, etc
  ε  --  'Error/Exception'    --  for exceptions, errors, unexpected results

Transforms:
  δ  --  'Get/To/From/As'     --  for interpreting, collecting some value from another, eg type conversion
  π  --  'Put/Add/Extend'     --  for adding, setting, creating, etc
  Σ  --  'Reduce'             --  for reducing, combining many things into one
  ι  --  'Is/Exists'          --  for existential, truthiness, yes, etc

Misc:
  ζ  --  'Zeus'               --  for Zeus-library related stuff
  κ  --  'Util/Debug'         --  for development, logging, debugging, etc

*/

// Zeus Object Constructor
var ζθ = function(γ){
  this.γ = γ;
};


// Init Zeus Prototype, contains all injected function versions
var ρζ = ζθ.prototype = {};


// Zeus Wrapper Function (Export)
var ζ = module.exports = function(v){
  return new ζθ(v);
};


// Zeus Context
ζ.ς = {};


// Extend Zeus Context
ρζ.ζπς = function(θς) {
  if(!θς) return;
  for(α in θς)  ζ.ς[α] = θς[α];
  return this;
}


// Extend Zeus Functions
ρζ.ζπΔ = function(θΔ) {
  if(!θΔ) return;
  for(α in θΔ) {  (function(){
    var Δ = ζ.ς[α] = θΔ[α];
    
    ζ.ς['ζ'+α] = ρζ[α] = function() {
      return ζ(Δ.apply(this, [this.γ].concat(arguments)));
    };
    
    ρζ[α+'Ω'] = function() {
      return Δ.apply(this, [this.γ].concat(arguments));
    }
  })();  }
  return this;
}


// Populate Default Object
with (ζ.ς) {
  
  // Core Context
  ρζ.ζπς({
  
    ρσ: String.prototype,   // Prototype of String
    ρλ: Array.prototype,    // Prototype of Array
    ρθ: Object.prototype,   // Prototype of Object
    ρΔ: Function.prototype, // Prototype of Function
    
    ψτβ: 'β',  //  Global Type Ref (Boolean)
    ψτη: 'η',  //              ... (Number)
    ψτσ: 'σ',  //              ... (String)
    ψτλ: 'λ',  //              ... (Array)
    ψτθ: 'θ',  //              ... (Object)
    ψτΔ: 'Δ',  //              ... (Function)
    ψτφ: 'φ',  //              ... (Null/Undefined)
    
    φ: null  // φ  --  Global null reference
    
  });
  
  
  // Core Functions
  ρζ.ζπΔ({
    
    // Exists?
    ι: function(μ) {  return (μ != undefined) && (μ != null)  },
    
    // Get Prototype
    δρ: function(μ) {  return ι(μ) ? μ.prototype : null  },
    
    // Is Value Array?
    ιμλ: function(μ) { return τδ(μ) == ψτλ; },
    
    // Is Value Function?
    ιμΔ: function(μ) { return τδ(μ) == ψτΔ; },
    
    // Get Type
    τδ: function(μ) {
      σ = ρθ.toString.call(μ);
      switch(σ){
        case '[object Boolean]'  : return ψτβ;
        case '[object Number]'   : return ψτη;
        case '[object String]'   : return ψτσ;
        case '[object Object]'   : return ψτθ;
        case '[object Array]'    : return ψτλ;
        case '[object Function]' : return ψτΔ;
        default: case '[object Null]': case '[object Undefined]': return ψτφ;
      }
    },
    
    // Slice string
    σδ: function(σ, ηΑ, ηΩ) {
      return ρσ.slice.call(σ, ηΑ, ηΩ);
    },
    
    // Combine strings
    σΣ: function() {
      var λσ = arguments;
      return ρσ.concat.apply(λσ[0], ρλ.slice.call(arguments, 1));
    },
    
    // To Upper Case
    σupper: function(σ) {
      return σ.toUpperCase();
    },
    
    // Chain passed functions
    ξΣ: function() {
      var λ = arguments, μζ = ζ( λ[0] ),
          ηλ = λ.length, η = 1, μ = null;
          
      while(η < ηλ){
        μ = λ[η++];
        μζ = ιμλ(μ) ? ζ( μ[0].apply(
            μ[0], [μζ.γ].concat(μ.slice(1))) )
          : ιμΔ(μ) ? ζ( μ(μζ.γ) )
          : ζ( μ );
      }
      
      return μζ;
    },
    
    // Console.log
    κ: function(μ) {
      console.log(μ);
      return μ;
    }
  });
}
